(function() {
  'use strict';

  dataservice.$inject = ['$http'];

  function dataservice($http) {
    var dataservice = function() {};

    dataservice.prototype = {
      getChapters: function() { return get('/chapters'); },
      getStatesGeoJson: function() { return get('/states/geojson'); },
      getCountiesGeoJson: function() { return get('/counties/geojson'); },
      getStateTotals: function() { return get('/states/totals'); },
      getCountyTotals: function() { return get('/counties/totals'); }
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