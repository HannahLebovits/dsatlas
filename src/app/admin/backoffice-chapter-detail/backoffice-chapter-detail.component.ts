import { Component, OnInit } from '@angular/core';
import { ChapterModel } from '../../shared/model/chapter.model';
import { DataService } from '../../shared/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-backoffice-chapter-detail',
  templateUrl: './backoffice-chapter-detail.component.html',
  styleUrls: ['./backoffice-chapter-detail.component.scss']
})
export class BackOfficeChapterDetailComponent implements OnInit {
  editing$: Observable<ChapterModel>;

  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
    this.editing$ = this._dataService.editing$;
  }
}
