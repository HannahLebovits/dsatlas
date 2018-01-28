(function() {
  'use strict';

  ModalInstanceController.$inject = ['$uibModalInstance', 'dataservice'];

  function ModalInstanceController($uibModalInstance, dataservice) {
    var vm = this;
    vm.dataservice = new dataservice();

    vm.close = function() {
      $uibModalInstance.close();
    };

    vm.sendEmail = function() {
      var data = {};
      data['email'] = vm.email;
      data['name'] = vm.name;
      data['content'] = vm.content;
      vm.dataservice.sendEmail(data).then(function(result) {
        vm.close();
      });
    }
  }

  angular.module('dsatlas.app')
    .controller('ModalInstanceController', ModalInstanceController);
})();