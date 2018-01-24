(function() {
  'use strict';

  AppController.$inject = ['$scope', '$uibModal', 'dataservice', '$location', '$state'];

  function AppController($scope, $uibModal, dataservice, $location, $state) {
    var vm = this;
    vm.dataservice = new dataservice();

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
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