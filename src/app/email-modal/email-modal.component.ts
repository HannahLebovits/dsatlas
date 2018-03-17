import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../shared/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {
  modalReference: NgbModalRef;
  emailForm: FormGroup;
  name: FormControl;
  email: FormControl;
  feedback: FormControl;
  recaptcha: FormControl;
  sending = false;

  constructor(private _modalService: NgbModal, private _dataService: DataService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.name = new FormControl('', Validators.required);
    this.feedback = new FormControl('', Validators.required);
    this.recaptcha = new FormControl(null, Validators.required);
  }

  createForm() {
    this.emailForm = new FormGroup({
      name: this.name,
      email: this.email,
      feedback: this.feedback,
      recaptcha: this.recaptcha
    });
  }

  open(content) {
    this.modalReference = this._modalService.open(content);
  }

  resolved(captchaResponse: string) { }

  sendEmail() {
    this.sending = true;
    const data = {
      email: this.email.value,
      name: this.name.value,
      content: this.feedback.value
    };

    this._dataService.sendEmail(data).subscribe(
      (res) => {
        this.modalReference.close();
        this.sending = false;
      }, (err) => {
        this.sending = false;
        console.log(err);
      },
      () => {
        this.modalReference.close();
        this.sending = false;
      }
    );
  }
}
