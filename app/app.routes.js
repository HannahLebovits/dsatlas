(function() {
  'use strict';

  angular.module('dsatlas.app')
    .config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/map');
      $stateProvider
        .state('main', {
          name: 'name',
          abstract: true,
          resolve: {
            dataservice: 'dataservice',
            chapters: function(dataservice) { return (new dataservice()).getChapters().then(function(res) { return res.data; }) },
            statesGeoJson: function (dataservice) { return (new dataservice()).getStatesGeoJson().then(function(res) { return res.data; }); },
            countiesGeoJson: function(dataservice) { return (new dataservice()).getCountiesGeoJson().then(function(res) { return res.data; }) },
            districtsGeoJson: function(dataservice) { return (new dataservice()).getDistrictsGeoJson().then(function(res) { return res.data; }) },
            stateTotals: function(dataservice) { return (new dataservice()).getStateTotals().then(function(res) { return res.data; }) },
            countyTotals: function(dataservice) { return (new dataservice()).getCountyTotals().then(function(res) { return res.data; }) },
            districtTotals: function(dataservice) { return (new dataservice()).getDistrictTotals().then(function(res) { return res.data; }) },
            stateNumbers: function(dataservice) { return (new dataservice()).getStateNumberMap().then(function(res) { return res.data; }) },
          },
          controller: function ($scope, statesGeoJson, countiesGeoJson, districtsGeoJson, stateTotals, countyTotals, districtTotals, stateNumbers, chapters) {
            $scope.statesGeoJson = statesGeoJson;
            $scope.countiesGeoJson = countiesGeoJson;
            $scope.districtsGeoJson = districtsGeoJson;
            $scope.stateTotals = stateTotals;
            $scope.countyTotals = countyTotals;
            $scope.districtTotals = districtTotals;
            $scope.stateNumbers = stateNumbers;
            $scope.chapters = chapters;
            var chaptersPerState = {};
            chapters.forEach(function(chapter) {
              chaptersPerState[chapter.state] = (chaptersPerState[chapter.state] || 0) + 1;
            });
            $scope.chaptersPerState = chaptersPerState;
          }
        })
        .state('map', {
          url: '/map?lat&lon',
          templateUrl: 'app/main/views/map.html',
          parent: 'main',
          controller: 'AppController',
          controllerAs: 'vm'
        })
        .state('list', {
          url: '/list',
          templateUrl: 'app/main/views/list.html',
          parent: 'main',
          controller: 'AppController',
          controllerAs: 'vm'
        });
    }]);
})();