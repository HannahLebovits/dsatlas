(function() {
  'use strict';

  AppController.$inject = ['$scope', '$uibModal', 'dataservice', '$location', '$state', '$stateParams'];

  function AppController($scope, $uibModal, dataservice, $location, $state, $stateParams) {
    var vm = this;
    vm.dataservice = new dataservice();

    parseQueryParameters();

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.openModal = function(modalId, size) {
      var templateUrl;
      if (modalId === 'about') {
        templateUrl = '/app/modal/views/about.html';
      } else if (modalId === 'email') {
        templateUrl = '/app/modal/views/email.html';
      }

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: templateUrl,
        controller: 'ModalInstanceController',
        controllerAs: '$modalCtrl',
        size: size,
        appendTo: angular.element(document).find('body')
      });
    };

    $scope.goTo = function(value) {
      var params = {
        lat: value.lat,
        lon: value.lon
      };
      $state.go('map',params)
    };

    function parseQueryParameters() {
      $scope.lat = $stateParams.lat;
      $scope.lon = $stateParams.lon;
    }
  }

  angular.module('dsatlas.app')
    .controller('AppController', AppController);
})();