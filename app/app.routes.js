(function() {
  'use strict';

  angular.module('dsatlas.app')
    .config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/map');
      $stateProvider
        .state('map', {
          url: '/map',
          views: {
            'main': { templateUrl: 'app/main/views/map.html' }
          }
        })
        .state('list', {
          url: '/list',
          views: {
            'main': { templateUrl: 'app/main/views/list.html' }
          }
        });
    }]);
})();