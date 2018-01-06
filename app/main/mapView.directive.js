(function() {
  'use strict';

  mapView.$inject = ['$timeout', 'd3Service'];

  function mapView($timeout, d3Service) {
    return {
      restrict: 'E',
      template: '<div id="map"></div>',
      scope: {
        chapters: '=',
        states: '=',
        options: '='
      },
      replace: true,
      link: linkFunction
    };

    function linkFunction(scope, element, attrs) {

      var info = {};
      var legend = {};
      var statesTotals = {};
      var chaptersByState = {};

      d3Service.d3().then(function(d3) {


        var map = new L.Map('map', { center: [37.8, -96.9], zoom: 4});
        var tiles = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
        tiles.addTo(map);


        // States
        var states = populateStates(map);
        var markerClusters = populateMarkers(map);

        map.addLayer(states);
        map.addLayer(markerClusters);

        var overlayData = {
          "Chapter locations": markerClusters,
          "Chapter Membership by State": states
        };

        L.control.layers(null,overlayData).addTo(map);


        map.on('overlayremove', function(e) {
          if (e.name === 'Chapter Membership by State') {
            legend.remove(map);
            info.remove(map);
          }
        });

        map.on('overlayadd', function(e) {
          if (e.name === 'Chapter Membership by State') {
            legend.addTo(map);
            info.addTo(map);
          }
          states.bringToBack();
        });

        legend = makeLegend(map);
        info = makeInfoBox(map);

      });

      var radius = function(d, scalar, range, minRadius, maxClip) {
        return Math.min(maxClip, (scalar * (d.members - range.min)/(range.max - range.min)) + minRadius);
      };

      // TODO move this to separate html file, add css
      var popup = function(d) {
        var p = '<div style="font-size: large;"><h3>' + d.name + '</h3> \
        <div style="display: block; width: 100%;">';
        if (d.members === 0 && !d.twitter && !d.facebook && !d.website) {
          p += '<div class="text-right">' + d.city + ', ' + d.state + '</div>';
        } else {
          p += '<div class="pull-right">' + d.city + ', ' + d.state + '</div>';
        }
        if (d.members > 0) {
          p += '<div style="display: inline-block; width: 50%; text-align: left;" >' + d.members + ' members</div>';
        }
        if (d.twitter) {
          p += '<div><a href="https://twitter.com/' + d.twitter + '" target="_blank"><i class="fa fa-twitter"></i> @' + d.twitter + '</a></div>';
        }
        if (d.facebook) {
          p += '<div><a href="https://facebook.com/' + d.facebook + '" target="_blank"><i class="fa fa-facebook"></i> ' + d.facebook + ' </a></div>';
        }
        if (d.website) {
          p += '<div><a href="' + d.website + '" target="_blank"><i class="fa fa-globe"></i> ' + d.website + '</a></div>';
        }
        p += '</div>';

        return p;
      };

      function populateStates(map) {

        getNumbersByState();
        var statesJson = {};

        function style(feature) {
          return {
            weight: 1,
            opacity: 0.5,
            color: '#333',
            dashArray: '0',
            fillOpacity: 0.8,
            fillColor: getColor(statesTotals[feature.properties.abbr])
          };
        }

        function resetHighlight(e) {
          statesJson.resetStyle(e.target);
          info.update();
        }

        function highlightFeature(e) {
          var layer = e.target;
          layer.setStyle({
            fillOpacity: 1.0
          });

          info.update(layer.feature.properties);
        }

        function zoomToFeature(e) {
          map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          })
        }

        statesJson = L.geoJSON(statesData, {
          style: style,
          onEachFeature: onEachFeature
        });

        return statesJson;
      }

      function populateMarkers(map) {
        var range = getVisualRange(scope.chapters);

        var minRadius = 7;
        var scalar = 30;
        var clipMax = 30;

        var circles = [];

        var markerClusters = L.markerClusterGroup(
          {
            maxClusterRadius: 15,
            iconCreateFunction: function (cluster) {
              var size = cluster.getChildCount();
              var html = "<div class='clusterInner'>" + size + "</div>";
              return L.divIcon({
                html: html,
                className: 'clusterOuter',
                iconSize: L.point(clipMax,clipMax) });
            },
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
          }
        );

        scope.chapters.forEach(function(d) {
          d.LatLng = new L.LatLng(d.lat, d.lon);
          var circle = L.circleMarker(d.LatLng, {
            color: '#fff',
            weight: 2,
            fill: true,
            fillColor: '#f00',
            fillOpacity: 0.7,
            opacity: 0.7,
            radius: radius(d,scalar,range,minRadius,clipMax)
          }).on('click', function(e) {
            map.panTo(e.latlng, { animate: true }); })
            .bindPopup(popup(d));

          circles.push(circle);
        });

        markerClusters.addLayers(circles);

        return markerClusters;
      }

      function getVisualRange() {
        var min = scope.chapters[0].members;
        var max = min;

        scope.chapters.forEach(function(c) {
          var members = c.members;
          if (members < min) min = members;
          if (members > max) max = members;
        });

        return { 'min': min, 'max': max };
      }

      function getNumbersByState() {
        scope.chapters.forEach(function(chapter) {
          statesTotals[chapter.state] = (statesTotals[chapter.state] || 0 ) + chapter.members;
          chaptersByState[chapter.state] = (chaptersByState[chapter.state] || 0 ) + 1;
        });
      }

      function makeInfoBox(map) {
        var info = L.control();
        info.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
        };
        info.update = function(props) {
          this._div.innerHTML = '<h4>Chapter membership</h4>' + (props ?
            '<b>' + props.name + '</b></br>' +
            (statesTotals[props.abbr] || 0) + ' members</br>' +
            (chaptersByState[props.abbr] || 0) + ' chapters</br>'

            : 'Hover over a state');
        };
        info.addTo(map);
        return info;
      }

      function makeLegend(map) {
        var legend = L.control({ position: 'bottomright' });

        legend.onAdd = function(map) {
          var div = L.DomUtil.create('div', 'info legend'),
              brackets = getColorBrackets();

          div.innerHTML = '<i style="background: ' + getColor(brackets[0]) + '"></i>' + brackets[0] + ' +</br>';
          for (var i=1; i<brackets.length-1; ++i) {
            div.innerHTML +=
              '<i style="background: ' + getColor(brackets[i]) + '"></i>' +
              brackets[i] + ' &ndash; ' + brackets[i+1] + '</br>';
          }
          div.innerHTML += '<i style="background: ' + getColor("#333333") + '"></i>No Data</br>';

          return div;
        };

        legend.addTo(map);

        return legend;
      }

      function getColorValues() {
        return [
          "#f44336",
          "#f5574c",
          "#f66c62",
          "#f78179",
          "#f8968f",
          "#faaba5",
          "#fbc0bc",
          "#fcd5d2",
          "#fdeae8",
          "#ffffff"
        ];

      }

      function getColorBrackets() {
        return [ 900, 800, 700, 600, 500, 400, 300, 200, 100, 0 ];
      }

      function getColor(d) {
        var colors = getColorValues();
        var brackets = getColorBrackets();
        for (var i=0; i<brackets.length; ++i) {
          if (d >= brackets[i]) {
            return colors[i];
          }
        }
        return '#333333';
      }
    }
  }

  angular
    .module('dsatlas.app')
    .directive('mapView', mapView);
})();