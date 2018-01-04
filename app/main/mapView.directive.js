(function() {
  'use strict';

  mapView.$inject = ['$timeout', 'd3Service'];

  function mapView($timeout, d3Service) {
    return {
      restrict: 'E',
      template: '<div id="map"></div>',
      scope: {
        chapters: '=',
        options: '='
      },
      replace: true,
      link: linkFunction
    };

    function linkFunction(scope, element, attrs) {

      d3Service.d3().then(function(d3) {
        var map = new L.Map("map", { center: [37.8, -96.9], zoom: 4});

        var minRadius = 7;
        var scalar = 30;
        var clipMax = 30;

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
        var chapters = scope.chapters;

        angular.extend(scope.options, {
          select: function(index){
          }
        });

        var tileLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

        var svg = d3.select('#map').select('svg');
        var g = svg.append('g');

        var range = getVisualRange(chapters);

        chapters.forEach(function(d) {
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

          markerClusters.addLayer(circle);
        });

        map.addLayer(tileLayer);
        map.addLayer(markerClusters);

        /*
        var overlayData = {
          "Chapters": markers
        };

        L.control.layers(overlayData).addTo(map);
        */

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
          p += '<div><a href="https://twitter.com/' + d.twitter + '"><i class="fa fa-twitter"></i> @' + d.twitter + '</a></div>';
        }
        if (d.facebook) {
          p += '<div><a href="https://facebook.com/' + d.facebook + '"><i class="fa fa-facebook"></i> ' + d.facebook + ' </a></div>';
        }
        if (d.website) {
          p += '<div><a href="' + d.website + '"><i class="fa fa-earth"></i> ' + d.website + '</a></div>';
        }
        p += '</div>';

        return p;
      };

      function getVisualRange(chapters) {
        var min = chapters[0].members;
        var max = min;

        chapters.forEach(function(c) {
          var members = c.members;
          if (members < min) min = members;
          if (members > max) max = members;
        });

        return { 'min': min, 'max': max };
      }
    }
  }

  angular
    .module('dsatlas.app')
    .directive('mapView', mapView);
})();