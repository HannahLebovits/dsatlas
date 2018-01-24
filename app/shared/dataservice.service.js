(function() {
  'use strict';

  dataservice.$inject = ['$http'];

  function dataservice($http) {
    var dataservice = function() {};

    dataservice.prototype = {
      getChapters: function() { return get('/chapters'); },
      getStatesGeoJson: function() { return get('/geojson/states'); },
      getCountiesGeoJson: function() { return get('/geojson/counties'); },
      getDistrictsGeoJson: function() { return get('/geojson/districts'); },
      getStateTotals: function() { return get('/totals/states'); },
      getCountyTotals: function() { return get('/totals/counties'); },
      getDistrictTotals: function() { return get('/totals/districts'); },
      getStateNumberMap: function() { return get('/const/statenumbers'); }
    };

    function get(endpoint) {
      return $http({
        method: 'GET',
        url: endpoint,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return dataservice;
  }

  angular
    .module('dsatlas.app')
    .service('dataservice', dataservice);
})();