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
  selected: ChapterModel = new ChapterModel({});
  sortTag = 'name';
  sortReverse = false;

  searchFilter = {
    name: ''
  };

  constructor(private _route: ActivatedRoute, private _dataService: DataService) { }

  isSelected(c: ChapterModel) {
    return this.selected === c;
  }
  onSelectionChange(c: ChapterModel) {
    this.selected = c;
    this._dataService.startEditing(c);
  }

  addChapter() {
    this._dataService.addEmptyChapter();
  }

  ngOnInit() {
    this._dataService.setChapters(this._route.snapshot.parent.data['chapters']);
    this._dataService.chapters$.subscribe(chapters => { this.chapters = chapters; });
  }
}
