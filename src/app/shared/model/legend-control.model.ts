import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable()
export class LegendControlModel extends L.Control {
  constructor() { super(); }
}
