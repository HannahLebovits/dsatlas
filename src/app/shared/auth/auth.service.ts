import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private _firebaseAuth: AngularFireAuth,
              private _router: Router) {
    this.user = _firebaseAuth.authState;
  }

  login(email: string, password: string) {
    this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this._router.navigateByUrl('/admin/backoffice');
      }).catch((err) => console.log('error: ', err.message) );
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(() => {
        this._router.navigate(['/admin']);
      });
  }

}
