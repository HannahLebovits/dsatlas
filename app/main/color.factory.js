(function() {
  'use strict';

  colorFactory.$inject = [];

  function colorFactory() {
    return {
      getColor: getColor,
      getStateBrackets: getStateBrackets,
      getCountyBrackets: getCountyBrackets,
      getDistrictBrackets: getDistrictBrackets,
      getColorValues: getColorValues
    };

    function getStateBrackets() {
      return [ 3000, 1000, 500, 100, 50, 1 ];
    }

    function getCountyBrackets() {
      return [ 300, 100, 50, 10, 5, 1 ];
    }

    function getDistrictBrackets() {
      return [ 300, 100, 50, 10, 5, 1 ];
    }

    function getColor(d, brackets) {
      var colors = getColorValues();
      for (var i=0; i<brackets.length; ++i) {
        if (d >= brackets[i]) {
          return colors[i];
        }
      }
      return colors[colors.length-1];
    }

    function getColorValues() {
      return [
        "#a50f15",
        "#de2d26",
        "#fb6a4a",
        "#fcae91",
        "#fee5d9",
        "#ffffff",
        "#333333"
      ];
    }
  }

  angular.module('dsatlas.app')
    .factory('colorFactory', colorFactory);
})();