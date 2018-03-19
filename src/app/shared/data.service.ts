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
  editing$: Observable<ChapterModel>;

  private _chapters: BehaviorSubject<ChapterModel[]>;
  private _editing: BehaviorSubject<ChapterModel>;

  private _headers = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
  private _dataStore: {
    chapters: ChapterModel[]
  };
  private _dirtyChapters: ChapterModel[] = [];
  private _newChapters: ChapterModel[] = [];


  constructor(private _http: HttpClient) {
    this._dataStore = { chapters: [] };
    this._chapters = <BehaviorSubject<ChapterModel[]>>new BehaviorSubject([]);
    this._editing = <BehaviorSubject<ChapterModel>>new BehaviorSubject<ChapterModel>(new ChapterModel({}));
    this.editing$ = this._editing.asObservable();
    this.chapters$ = this._chapters.asObservable();
  }

  deleteChapter(id: string) {
    this._http.delete<ChapterModel>(`/api/machines/del/${id}`)
      .subscribe(response => {
        this._dataStore.chapters.forEach((c, i) => {
          if (c._id === id) { this._dataStore.chapters.splice(i, 1); }
        });
        this._chapters.next(Object.assign({}, this._dataStore).chapters);
      }, error => {
        console.error(error);
      });
  }

  updateChapter(chap: ChapterModel) {
    this._http.post<ChapterModel>(`/api/chapters/update`, JSON.stringify(chap), { headers: this._headers })
      .subscribe(data => {
        this._dataStore.chapters.forEach((c, i) => {
          if (c._id === data._id) { this._dataStore.chapters[i] = data; }
        });
        this._chapters.next(Object.assign({}, this._dataStore).chapters);
      }, error => {
        console.error(error);
      });
  }

  createChapter(chap: ChapterModel) {
    this._http.post<ChapterModel>(`/api/chapters/add`, JSON.stringify(chap), { headers: this._headers })
      .subscribe(data => {
        this._dataStore.chapters.forEach((c, i) => {
          if (c._id === data._id) { this._dataStore.chapters[i] = data; }
        });
        this._chapters.next(Object.assign({}, this._dataStore).chapters);
      }, error => {
        console.error(error);
      });
  }

  addEmptyChapter() {
    const c = new ChapterModel();
    this._dataStore.chapters.push(c);
    this.setNew(c);
    this._chapters.next(Object.assign({}, this._dataStore).chapters);
  }

  startEditing(c: ChapterModel) {
    this._editing.next(c);
    this.setDirty(this._editing.getValue());
    console.log(this._editing.getValue().name);
    return c;
  }

  finishEditing() {
    this._dataStore.chapters.forEach((c, i) => {
      if (c._id === this._editing.getValue()._id) {
        this._dataStore.chapters[i] = this._editing.getValue();
      }
    });
    this._chapters.next(Object.assign({}, this._dataStore).chapters);
    this.unsetDirty(this._editing.getValue());
    this._editing.next(Object.assign(new ChapterModel({})));
  }

  setNew(c: ChapterModel) {
    if (!this.isNew(c)) {
      this._newChapters.push(c);
      this.setDirty(c);
    }
  }

  unsetNew(c: ChapterModel) {
    if (this.isNew(c)) {
      this._newChapters.splice(this._newChapters.indexOf(c));
      this.unsetDirty(c);
    }
  }

  isNew(c: ChapterModel) {
    return this._newChapters.some(x => x._id === c._id);
  }

  setDirty(c: ChapterModel) {
    if (!this.isDirty(c)) {
      this._dirtyChapters.push(c);
    }
  }

  isDirty(c: ChapterModel) {
    return this._dirtyChapters.some(x => x._id === c._id);
  }

  unsetDirty(c: ChapterModel) {
    if (this.isDirty(c)) {
      this._dirtyChapters.splice(this._dirtyChapters.indexOf(c));
    }
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
