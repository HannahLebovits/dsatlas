import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChapterModel } from './model/chapter.model';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  chapters$: Observable<ChapterModel[]>;
  private _chapters: BehaviorSubject<ChapterModel[]>;
  private _dataStore: {
    chapters: ChapterModel[]
  };

  constructor(private _http: HttpClient) {
    this._dataStore = { chapters: [] };
    this._chapters = <BehaviorSubject<ChapterModel[]>>new BehaviorSubject([]);
    this.chapters$ = this._chapters.asObservable();
  }

  getChapters() {
    return this._http.get<ChapterModel[]>('/api/chapters');
  }

  getTotals(value: string) {
    return this._http.get<any>(`/api/totals/${value}`);
  }

  getGeoJson(value: string) {
    return this._http.get<any>(`/api/geojson/${value}`);
  }

  getStateNumbers() {
    return this._http.get<any>(`/api/statenumbers`);
  }

  sendEmail(data) {
    return this._http.post(`/api/email`, data, httpOptions);
  }
}
