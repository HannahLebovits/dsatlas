import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LegendControlModel } from './model/legend-control.model';
import { ColorMapService } from './color-map.service';

@Injectable()
export class LegendService {

  constructor(private _colorMapService: ColorMapService) { }

  makeLegend(gradientName, scope) {
    const legend = new LegendControlModel();
    legend.setPosition('bottomright');

    const brackets = this._colorMapService.brackets[scope];
    const gradient = this._colorMapService.gradients[gradientName];

    legend.onAdd = function() {
      const div = L.DomUtil.create('div', 'info legend');

      div.innerHTML = '<h4>Members</h4>';
      div.innerHTML += '<i style="background:' + gradient[0] + '"></i>';
      div.innerHTML += brackets[0] + ' +</br>';
      for (let i = 1; i < brackets.length; ++i) {
        div.innerHTML +=
          '<i style="background: ' + gradient[i] + '"></i>' +
          brackets[i] + ' &ndash; ' + brackets[i - 1] + '</br>';
      }

      return div;
    };

    return legend;
  }
}
