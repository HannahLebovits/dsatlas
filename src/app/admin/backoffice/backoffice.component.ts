import { Component, Input, OnInit } from '@angular/core';
import { ChapterModel } from '../../shared/model/chapter.model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackOfficeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
