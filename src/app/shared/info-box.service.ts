import { Injectable, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { InfoBoxControlModel } from './model/info-box-control.model';

@Injectable()
export class InfoBoxService {

  stateInfoBox(totalMembers, totalChapters) {
    const info = this.initBox();

    info.update = function(props) {
      this._div.innerHTML = '<h4>State Information</h4>' + (props ?
        '<b>' + props.name + '</b>  <img src="/assets/img/flags/' + props.abbr.toLowerCase() + '.svg" height="10px" /></br>' +
        (totalMembers[props.abbr] || 0) + ' members</br>' +
        (totalChapters[props.abbr] || 0) + ' chapters</br>'
        : 'Hover over a state');
    };

    return info;
  }

  countyInfoBox(totalMembers) {
    const info = this.initBox();

    info.update = function(props) {

      let label = 'County';
      let output = 'Hover over a county';
      let name = '';


      if (props) {
        const state  = props['STATE'];
        const county = props['COUNTY'];
        const fips   = state + county;
        name   = props['NAME'];
        label  = (state === '22' ? 'Parish' :
                 (state === '72' ? 'Municipio' :
                 (state === '02' ? 'Borough' : 'County')));
        output = (totalMembers[fips] || 0) + ' members</br>';
      }

      this._div.innerHTML = '<h4>County Information</h4>' +
        '<b>' + name + ' ' + label + '</b></br>' + output;
    };

    return info;
  }

  districtBoxInfo(totalMembers, stateNumbers) {
    const info = this.initBox();

    info.update = function(props) {

      let label = '';
      let output = 'Hover over a congressional district';

      if (props) {
        const state = props[ 'STATE' ];
        const district = props[ 'CD' ];
        const distInt = parseInt(district, 10);
        const shortened = state + district;
        const stateLabel = stateNumbers[ state ][ 'name' ];

        label = (distInt === 0 ? 'At Large' :
                 distInt === 98 ? '(Non-Voting)' : 'District ' + distInt);
        output = '<b>' + stateLabel + ' ' + label + '</b><br />' +
                 (totalMembers[ shortened ] || 0) + ' members</br>';

      }

      this._div.innerHTML = '<h4>Congressional District<br />Information</h4><br />' + output;
    };

    return info;
  }

  initBox(): InfoBoxControlModel {
    const info = new InfoBoxControlModel();

    info.onAdd = function() {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };
    return info;
  }
}
