import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {
  user: Observable<firebase.User>;

  constructor(private _auth: AngularFireAuth, private _router: Router) {
    this.user = _auth.authState;
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    let loggedIn;
    return this.user.map(u => {
      loggedIn = !!u;
      if (loggedIn) {
        return true;
      } else {
        this._router.navigate(['/admin']);
        return false;
      }
    });
  }
}
