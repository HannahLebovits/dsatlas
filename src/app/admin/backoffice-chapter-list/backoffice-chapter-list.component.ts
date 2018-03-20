import { Component, OnInit } from '@angular/core';
import { ChapterModel } from '../../shared/model/chapter.model';
import { DataService } from '../../shared/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backoffice-chapter-list',
  templateUrl: './backoffice-chapter-list.component.html',
  styleUrls: ['./backoffice-chapter-list.component.scss']
})
export class BackOfficeChapterListComponent implements OnInit {
  chapters: ChapterModel[];
  searchFilter;

  constructor(private _route: ActivatedRoute, private _dataService: DataService) { }

  selectChapter(c: ChapterModel) {
    this._dataService.startEditing(c);
  }

  addChapter() {
    this._dataService.addEmptyChapter();
  }

  ngOnInit() {
    this.chapters = this._route.snapshot.parent.data[ 'chapters' ];
  }
}
