(function() {
  'use strict';

  infoBoxFactory.$inject = [];

  function infoBoxFactory() {
    return {
      stateInfoBox: stateInfoBox,
      countyInfoBox: countyInfoBox,
      districtInfoBox: districtInfoBox
    };

    function stateInfoBox(stateTotals, chaptersPerState) {
      var info = L.control();

      info.onAdd = function() {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };


      info.update = function(props) {

        this._div.innerHTML = '<h4>State Information</h4>' + (props ?
          '<b>' + props.name + '</b></br>' +
          (stateTotals[props.abbr] || 0) + ' members</br>' +
          (chaptersPerState[props.abbr] || 0) + ' chapters</br>'
          : 'Hover over a state');
      };

      return info;
    }

    function countyInfoBox(countyTotals) {
      var info = L.control();

      info.onAdd = function() {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };

      info.update = function(props) {

        if (props) {
          var state = props['STATE'],
            county = props['COUNTY'],
            name = props['NAME'],
            fips = state + county,
            label = (state === '22' ? 'Parish' :
                    (state === '72' ? 'Municipio' :
                    (state === '02' ? 'Borough' : 'County')));

          this._div.innerHTML = '<h4>County Information</h4>' + (props ?
            '<b>' + name + ' ' + label + '</b></br>' +
            (countyTotals[fips] || 0) + ' members</br>'
            : 'Hover over a county');
        }
      };

      return info;
    }

    function districtInfoBox(districtTotals, stateNumbers) {
      var info = L.control();

      info.onAdd = function() {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };

      info.update = function(props) {

        if (props) {
          var state = props['STATE'],
              district = props['CD'],
              distInt = parseInt(district),
              shortened = state + district,
              label = (distInt === 0 ? 'At Large' :
                       distInt === 98 ? '(Non-Voting)' : 'District ' + distInt),
              stateLabel = stateNumbers[state]['name'];

          this._div.innerHTML = '<h4>Congressional District Information</h4>' + (props ?
            '<b>' + stateLabel + ' ' + label + '</b></br>' +
            (districtTotals[shortened] || 0) + ' members</br>'
            : 'Hover over a congressional district');
        }
      };

      return info;
    }

    function makeInfoBox(level) {

    }

  }

  angular.module('dsatlas.app')
    .factory('infoBoxFactory', infoBoxFactory);
})();