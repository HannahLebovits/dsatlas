import { Component } from '@angular/core';
import { ChapterModel } from '../../shared/model/chapter.model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-backoffice-chapter-list',
  templateUrl: './backoffice-chapter-list.component.html',
  styleUrls: ['./backoffice-chapter-list.component.scss']
})
export class BackOfficeChapterListComponent {
  chapters: ChapterModel[] = [];
  searchFilter;

  constructor(private _dataService: DataService) {
    // this._dataService.getChapters().subscribe(
    //    (chapters) => { this.chapters = chapters; }
    // );
    this.chapters = [
      new ChapterModel({ _id: 0, city: 'Houston', state: 'TX', lat: 29.7604, lon: -95.3698, name: 'Houston DSA' }),
      new ChapterModel({ _id: 1, city: 'Denver', state: 'CO', lat: 39.7392, lon: -104.9903, name: 'Denver DSA' })
    ];
  }

  selectChapter(c: ChapterModel) {
    this._dataService.startEditing(c);
  }
}
