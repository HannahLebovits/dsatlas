import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _authService: AuthService) { }

  user = {
    email: '',
    password: ''
  };

  signIn() {
    this._authService.login(this.user.email, this.user.password);
  }
}
