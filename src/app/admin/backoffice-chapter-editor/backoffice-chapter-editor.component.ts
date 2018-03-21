import { Component } from '@angular/core';
import { ChapterModel } from '../../shared/model/chapter.model';

@Component({
  selector: 'app-chapter-editor',
  templateUrl: './backoffice-chapter-editor.component.html',
  styleUrls: ['./backoffice-chapter-editor.component.scss']
})
export class BackOfficeChapterEditorComponent {
  chapters: ChapterModel[];
  constructor() { }
}
