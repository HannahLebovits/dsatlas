(function() {
  'use strict';

  mapView.$inject = ['$timeout', '$compile', 'd3Service', 'legendFactory', 'colorFactory', 'infoBoxFactory'];

  function mapView($timeout, $compile, d3Service, legendFactory, colorFactory, infoBoxFactory) {
    return {
      restrict: 'E',
      template: '<div id="map"></div>',
      replace: true,
      link: linkFunction
    };

    function linkFunction(scope, elem, attrs) {
      var vm = this;

      vm.stateInfo = {};
      vm.stateLegend = {};

      vm.countyInfo = {};
      vm.countyLegend = {};

      vm.districtInfo = {};
      vm.districtLegend = {};

      vm.countyBrackets = colorFactory.getCountyBrackets();
      vm.stateBrackets = colorFactory.getStateBrackets();
      vm.districtBrackets = colorFactory.getDistrictBrackets();

      d3Service.d3().then(function(d3) {

        var map = new L.Map('map', { center: [37.8, -96.9], zoom: 4});
        var tiles = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
        tiles.addTo(map);

        var states = populateStates(map);
        var counties = populateCounties(map);
        var districts = populateDistricts(map);
        var markerClusters = populateMarkers(map);
        var off = L.circleMarker(new L.LatLng(0,0), {
          opacity: 0.0,
          fillOpacity: 0.0
          });

        vm.stateInfo = infoBoxFactory.stateInfoBox(scope.stateTotals, scope.chaptersPerState);
        vm.countyInfo = infoBoxFactory.countyInfoBox(scope.countyTotals);
        vm.districtInfo = infoBoxFactory.districtInfoBox(scope.districtTotals, scope.stateNumbers);

        map.addLayer(states);
        map.addLayer(markerClusters);

        states.bringToBack();

        var overlays = {
          "Chapter locations": markerClusters
        };

        var baseLayers = {
          "States": states,
          "Counties": counties,
          "National Congressional Districts": districts,
          "Off": off
        };

        L.control.layers(baseLayers,overlays).addTo(map);

        vm.stateLegend = legendFactory.makeLegend(map, vm.stateBrackets);
        vm.countyLegend = legendFactory.makeLegend(map, vm.countyBrackets);
        vm.districtLegend = legendFactory.makeLegend(map, vm.districtBrackets);

        vm.stateLegend.addTo(map);
        vm.stateInfo.addTo(map);

        map.on('baselayerchange', function(e) {
          if (e.name === 'States') {
            vm.countyLegend.remove(map);
            vm.countyInfo.remove(map);

            vm.districtLegend.remove(map);
            vm.districtInfo.remove(map);

            vm.stateLegend.addTo(map);
            vm.stateInfo.addTo(map);

            states.bringToBack();
          } else if (e.name === 'Counties') {
            vm.stateLegend.remove(map);
            vm.stateInfo.remove(map);

            vm.districtLegend.remove(map);
            vm.districtInfo.remove(map);

            vm.countyLegend.addTo(map);
            vm.countyInfo.addTo(map);
            counties.bringToBack();
          } else if (e.name === 'National Congressional Districts') {
            vm.stateLegend.remove(map);
            vm.stateInfo.remove(map);

            vm.countyLegend.remove(map);
            vm.countyInfo.remove(map);

            vm.districtLegend.addTo(map);
            vm.districtInfo.addTo(map);

            districts.bringToBack();
          } else if (e.name === 'Off') {
            vm.stateLegend.remove(map);
            vm.stateInfo.remove(map);

            vm.countyLegend.remove(map);
            vm.countyInfo.remove(map);

            vm.districtLegend.remove(map);
            vm.districtInfo.remove(map);
          }
        });
      });

      var radius = function(d, scalar, range, minRadius, maxClip) {
        return Math.min(maxClip, (scalar * (d.members - range.min)/(range.max - range.min)) + minRadius);
      };

      function populateDistricts(map) {
        var districtsJson = {};

        function style(feature) {
          return {
            weight: 0,
            opacity: 0.5,
            color: '#333',
            dashArray: '0',
            fillOpacity: 0.8,
            fillColor: colorFactory.getColor(
              scope.districtTotals[feature.properties['STATE'] + feature.properties['CD']], vm.districtBrackets)
          };
        }

        function resetHighlight(e) {
          districtsJson.resetStyle(e.target);
          vm.countyInfo.update();
        }

        function highlightFeature(e) {
          var layer = e.target;
          layer.setStyle({
            fillOpacity: 1.0,
            weight: 2
          });
          vm.districtInfo.update(layer.feature.properties);
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

        districtsJson = L.geoJSON(scope.districtsGeoJson, {
          style: style,
          onEachFeature: onEachFeature,
          smoothFactor: 0.3
        });

        return districtsJson;

      }

      function populateCounties(map) {
        var countiesJson = {};
        function style(feature) {
          return {
            weight: 0,
            opacity: 0.5,
            color: '#333',
            dashArray: '0',
            fillOpacity: 0.8,
            fillColor: colorFactory.getColor(
              scope.countyTotals[feature.properties['STATE'] + feature.properties['COUNTY']], vm.countyBrackets)
          };
        }

        function resetHighlight(e) {
          countiesJson.resetStyle(e.target);
          vm.countyInfo.update();
        }

        function highlightFeature(e) {
          var layer = e.target;
          layer.setStyle({
            fillOpacity: 1.0,
            weight: 2
          });
          vm.countyInfo.update(layer.feature.properties);
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

        countiesJson = L.geoJSON(scope.countiesGeoJson, {
          style: style,
          onEachFeature: onEachFeature,
          smoothFactor: 0.3
        });

        return countiesJson;
      }

      function populateStates(map) {
        var statesJson = {};

        function style(feature) {
          return {
            weight: 1,
            opacity: 0.5,
            color: '#333',
            dashArray: '0',
            fillOpacity: 0.8,
            fillColor: colorFactory.getColor(scope.stateTotals[feature.properties.abbr], vm.stateBrackets)
          };
        }

        function resetHighlight(e) {
          statesJson.resetStyle(e.target);
          vm.stateInfo.update();
        }

        function highlightFeature(e) {
          var layer = e.target;
          layer.setStyle({
            fillOpacity: 1.0,
            weight: 2
          });
          vm.stateInfo.update(layer.feature.properties);
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

        statesJson = L.geoJSON(scope.statesGeoJson, {
          style: style,
          onEachFeature: onEachFeature,
          smoothFactor: 0.3
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
            map.panTo(e.latlng, { animate: true });
          }).bindPopup(popup(d));

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

      var popup = function(d) {
        var p =
          '<div class="popup-container"><h3>' + d.name + '</h3>' +
          '<div class="popup-body">';

        if (d.members === 0 && !d.twitter && !d.facebook && !d.website) {
          p += '<div class="text-right">' + d.city + ', ' + d.state + '</div>';
        } else {
          p += '<div class="pull-right">' + d.city + ', ' + d.state + '</div>';
        }
        if (d.members > 0) {
          p += '<div class="popup-members-line">' + d.members + ' members</div>';
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

    }


  }

  angular
    .module('dsatlas.app')
    .directive('mapView', mapView);
})();