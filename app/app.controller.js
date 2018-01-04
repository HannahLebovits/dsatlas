(function() {
  'use strict';

  AppController.$inject = ['$scope', '$uibModal', 'dataservice', '$location', '$state'];

  function AppController($scope, $uibModal, dataservice, $location, $state) {
    var vm = this;
    vm.dataservice = new dataservice();

    vm.init = function() {
      vm.dataservice.getChapters().then(
        function(response) {
          $scope.chapters = response.data;
          $scope.dirOptions = {};
          $state.go('map');
        }, function (error) { console.log(error); }
      );
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