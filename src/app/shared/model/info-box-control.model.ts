import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable()
export class InfoBoxControlModel extends L.Control {
  constructor() { super(); }
  update(props): void {}
}
