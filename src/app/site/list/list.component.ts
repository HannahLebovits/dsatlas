import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChapterModel } from '../../shared/model/chapter.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  chapters: ChapterModel[];

  sortTag: string;
  sortReverse = false;

  public searchFilter = {
    name: '',
    city: '',
    state: ''
  };

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.chapters = this._route.snapshot.parent.data['chapters'];
  }

  setSort(sortTag: string) {
    if (this.sortTag === sortTag) {
      this.sortReverse = !this.sortReverse;
    }
    this.sortTag = sortTag;
  }

  flagSrc(state: string): string {
    return `/assets/img/flags/${state}.svg`;
  }

  goTo(c: ChapterModel) {
    const lat = c.lat;
    const lon = c.lon;
    this._router.navigate(['/map'], { queryParams: { lat: c.lat, lon: c.lon }});
  }
}
