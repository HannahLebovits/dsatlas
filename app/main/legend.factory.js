(function() {
  'use strict';

  legendFactory.$inject = ['colorFactory'];

  function legendFactory(colorFactory) {
    return {
      makeLegend: makeLegend
    };

    function makeLegend(map, brackets) {
      var legend = L.control({ position: 'bottomright' });

      legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend');

        div.innerHTML = '<h4>Members</h4>';
        div.innerHTML += '<i style="background: ' + colorFactory.getColor(brackets[0], brackets) + '"></i>' + brackets[0] + ' +</br>';
        for (var i=1; i<brackets.length-1; ++i) {
          div.innerHTML +=
            '<i style="background: ' + colorFactory.getColor(brackets[i], brackets) + '"></i>' +
            brackets[i] + ' &ndash; ' + brackets[i+1] + '</br>';
        }

        return div;
      };

      return legend;
    }
  }

  angular.module('dsatlas.app')
    .factory('legendFactory', legendFactory);

})();