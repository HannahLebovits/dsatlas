import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataService } from '../../data.service';

@Injectable()
export class StateTotalsResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getTotals('states');
  }
}

@Injectable()
export class CountyTotalsResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getTotals('counties');
  }
}

@Injectable()
export class DistrictTotalsResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getTotals('districts');
  }
}

@Injectable()
export class ElectedModelResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getElected();
  }
}

@Injectable()
export class StateNumbersResolver implements Resolve<any> {
  constructor(private _dataService: DataService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getStateNumbers();
  }
}
