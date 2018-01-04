(function() {
  'use strict';

  angular.module('dsatlas.app')
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.hashPrefix('');
    }]);
})();