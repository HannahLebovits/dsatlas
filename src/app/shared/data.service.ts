import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChapterModel } from './model/chapter.model';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  chapters$: Observable<ChapterModel[]>;
  selected$: Observable<ChapterModel>;
  editing$: Observable<boolean>;

  private _chapters: BehaviorSubject<ChapterModel[]>;
  private _selected: BehaviorSubject<ChapterModel>;
  private _editing: BehaviorSubject<boolean>;

  private _headers = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
  private _dataStore: { chapters: ChapterModel[] };
  private _newChapter: ChapterModel;

  constructor(private _toastr: ToastrService, private _http: HttpClient) {
    this._dataStore = { chapters: [] };
    this._chapters = <BehaviorSubject<ChapterModel[]>>new BehaviorSubject([]);
    this._selected = <BehaviorSubject<ChapterModel>>new BehaviorSubject<ChapterModel>(new ChapterModel({}));
    this._editing = <BehaviorSubject<boolean>>new BehaviorSubject<boolean>(false);
    this.selected$ = this._selected.asObservable();
    this.chapters$ = this._chapters.asObservable();
    this.editing$ = this._editing.asObservable();
  }

  setChapters(chapters: ChapterModel[]) {
    this._dataStore.chapters = chapters;
    this._chapters.next(Object.assign({}, this._dataStore).chapters);
  }

  deleteChapter(id: string) {
    this._http.delete<ChapterModel>(`/api/chapters/${id}`)
      .subscribe(response => {
        this._dataStore.chapters.forEach((c, i) => {
          if (c._id === id) { this._dataStore.chapters.splice(i, 1); }
        });
        this.stopEditing();
        this._toastr.success('Successfully deleted chapter', 'Success!');
      }, error => {
        this._toastr.error('Failed to delete chapter', 'Uh oh!');
        console.error(error);
      });
  }

  updateChapter(chap: ChapterModel) {
    const isNew = this.isNew(chap);
    this._http.post<ChapterModel>(`/api/chapters/update`, JSON.stringify(chap), { headers: this._headers })
      .subscribe(data => {
        if (isNew) {
          this._dataStore.chapters.push(data);
          this.unsetNew();
        } else {
          this._dataStore.chapters.forEach((c, i) => {
            if (c._id === data._id) { this._dataStore.chapters[i] = data; }
          });
        }
        this.stopEditing();
        this._toastr.success('Successfully updated chapter', 'Success!');
      }, error => {
        this._toastr.error('Failed to update chapter', 'Uh oh!');
        console.error(error);
      });
  }

  addEmptyChapter() {
    const c = new ChapterModel({ _id: UUID.UUID() });
    this._dataStore.chapters.push(c);
    this.setNew(c);
    this.startEditing(c);
  }

  startEditing(c: ChapterModel) {
    this._selected.next(Object.assign({}, c));
    this._editing.next(true);
    return c;
  }

  stopEditing() {
    this._chapters.next(Object.assign({}, this._dataStore).chapters);
    this._editing.next(false);
  }

  isNew(c: ChapterModel) {
    if (this._newChapter) {
      return this._newChapter._id === c._id;
    }
  }

  setNew(c: ChapterModel) {
    this._newChapter = c;
  }

  unsetNew() {
    this._newChapter = null;
  }

  getChapters(): any {
    return this._http.get<ChapterModel[]>('/api/chapters');
  }

  getTotals(value: string): any {
    return this._http.get<any>(`/api/totals/${value}`);
  }

  getGeoJson(value: string): any {
    return this._http.get<any>(`/api/geojson/${value}`);
  }

  getStateNumbers(): any {
    return this._http.get<any>(`/api/statenumbers`);
  }

  sendEmail(data): any {
    return this._http.post(`/api/email`, data, httpOptions);
  }
}
