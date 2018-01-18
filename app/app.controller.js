(function() {
  'use strict';

  AppController.$inject = ['$scope', '$uibModal', 'dataservice', '$location', '$state'];

  function AppController($scope, $uibModal, dataservice, $location, $state) {
    var vm = this;
    vm.dataservice = new dataservice();
    $scope.chaptersPerState = {};

    vm.init = function() {
      vm.dataservice.getStatesGeoJson().then(function(res) { $scope.statesGeoJson = res.data; });
      vm.dataservice.getCountiesGeoJson().then(function(res) { $scope.countiesGeoJson = res.data; });
      vm.dataservice.getStateTotals().then(function(res) { $scope.stateTotals = res.data; });
      vm.dataservice.getCountyTotals().then(function(res) { $scope.countyTotals = res.data; })

      vm.dataservice.getChapters().then(function(res) {
        $scope.chapters = res.data;
        $scope.chapters.forEach(function(chapter) {
          var state = chapter.state;
          $scope.chaptersPerState[state] = ($scope.chaptersPerState[state] || 0) + 1;
        });
      });
    };

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.selectOnMap = function(index) {
      $scope.dirOptions.select(index);
      $state.go('map');
    };

    $scope.openModal = function(size) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/modal/views/about.html',
        controller: 'ModalInstanceController',
        controllerAs: '$modalCtrl',
        size: size,
        appendTo: angular.element(document).find('body')
      });
    };
  }

  angular.module('dsatlas.app')
    .controller('AppController', AppController);
})();