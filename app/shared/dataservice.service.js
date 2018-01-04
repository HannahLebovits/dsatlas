(function() {
  'use strict';

  dataservice.$inject = ['$q','$http'];

  function dataservice($q,$http) {
    var dataservice = function() {};

    dataservice.prototype = {
      getChapters: function() { return get('/chapters'); }
    };

    function get(endpoint) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: endpoint,
        headers: { 'Content-Type': 'application/json' }
      }).then(
        function(result) { d.resolve(result); },
        function(error)  { d.resolve(error); }
      );
      return d.promise;
    }

    return dataservice;
  }

  angular
    .module('dsatlas.app')
    .service('dataservice', dataservice);
})();