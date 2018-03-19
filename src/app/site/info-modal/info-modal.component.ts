import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {
  constructor(private _modalService: NgbModal, @Inject(DOCUMENT) private document: any) { }

  open(content) {
    this._modalService.open(content, { size: 'lg' }).result.then((result) => { }, (reason) => { });
  }

  goTo(url: string) {
    this.document.location.href = url;
  }
}
