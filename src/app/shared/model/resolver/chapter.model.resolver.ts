import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ChapterModel } from '../chapter.model';
import { DataService } from '../../data.service';

@Injectable()
export class ChapterModelResolver implements Resolve<ChapterModel[]> {

  constructor(private _dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this._dataService.getChapters();
  }
}
