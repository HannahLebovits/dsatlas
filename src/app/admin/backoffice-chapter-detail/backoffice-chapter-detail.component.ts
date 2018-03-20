import { Component, OnInit } from '@angular/core';
import { ChapterModel } from '../../shared/model/chapter.model';
import { DataService } from '../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StatesService } from '../../shared/states.service';

@Component({
  selector: 'app-backoffice-chapter-detail',
  templateUrl: './backoffice-chapter-detail.component.html',
  styleUrls: ['./backoffice-chapter-detail.component.scss']
})
export class BackOfficeChapterDetailComponent implements OnInit {
  editing = false;
  selected: ChapterModel;
  states: string[] = [];
  chapterForm: FormGroup;

  constructor(private _dataService: DataService, private _statesService: StatesService) { }

  ngOnInit() {
    this._dataService.editing$.subscribe( editing => { this.editing = editing; });
    this._dataService.selected$.subscribe( selected => { this.selected = selected; });
    this.states = this._statesService.iso2s();
    this.chapterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      lat: new FormControl(0, Validators.required),
      lon: new FormControl(0, Validators.required),
      twitter: new FormControl(),
      facebook: new FormControl(),
      website: new FormControl()
    });
  }

  stateName(iso2) {
    return this._statesService.name(iso2);
  }
}
