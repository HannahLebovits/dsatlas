import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuthState } from 'firebase/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  authState: FirebaseAuthState = null;

  constructor(private _afAuth: AngularFireAuth,
              private _afs: AngularFirestore,
              private _router: Router) {
    this.authState = this._afAuth.authState;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  login(email: string, password: string) {
    this._afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('success!');
        this._router.navigate(['/admin/backoffice']);
      })
      .catch(err => {
        console.log('bogus :( ', err.message);
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    return userRef.set(data, { merge: true} );
  }

  logout() {
    this._afAuth
      .auth
      .signOut()
      .then(() => {
        this._router.navigate(['/admin']);
      });
  }
}
