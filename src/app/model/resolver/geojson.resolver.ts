import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataService } from '../../shared/data.service';

@Injectable()
export class StatesGeoJsonResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getGeoJson('states');
  }
}

@Injectable()
export class CountiesGeoJsonResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getGeoJson('counties');
  }
}

@Injectable()
export class DistrictsGeoJsonResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getGeoJson('districts');
  }
}
