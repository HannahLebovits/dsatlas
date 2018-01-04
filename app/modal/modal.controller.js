(function() {
  'use strict';

  ModalInstanceController.$inject = ['$uibModalInstance'];

  function ModalInstanceController($uibModalInstance) {
    var $ctrl = this;

    $ctrl.close = function() {
      $uibModalInstance.close();
    }
  }

  angular.module('dsatlas.app')
    .controller('ModalInstanceController', ModalInstanceController);
})();