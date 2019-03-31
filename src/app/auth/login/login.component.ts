
import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

    const uiConfig = {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {signInSuccessWithAuthResult: this.afterLogin.bind(this)}
    };

    this.ui = new firebaseui.auth.AuthUI(this.fireAuth.auth);
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  afterLogin(result) {

    const token = result && result.credential.accessToken;
    const user = {
      id:         result.user.uid,
      username:   result.user.displayName,
      fullname:   result.additionalUserInfo.profile.name,
      email:      result.user.email,
      photoUrl:   result.user.photoURL,
      token:      result.credential.accessToken,
    };

    localStorage.setItem( 'firebase_user', JSON.stringify(user) );
    localStorage.setItem( 'firebase_token', token );

    this.ngZone.run( () => this.router.navigateByUrl('/home') );

  }

}
