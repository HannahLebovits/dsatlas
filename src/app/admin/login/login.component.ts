import { Component } from '@angular/core';
import { UserModel } from '../../shared/model/user.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor() { }

  user: UserModel = new UserModel('', '');

}
