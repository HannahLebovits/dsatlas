import { Component, OnInit } from '@angular/core';
import { ChapterModel } from '../../shared/model/chapter.model';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackOfficeComponent implements OnInit {
  chapters: ChapterModel[];
  constructor() { }

  ngOnInit() { }

}
