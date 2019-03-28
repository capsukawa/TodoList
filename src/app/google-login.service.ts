import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { NavController } from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginService {
  userMail: string;

  constructor(private afAuth: AngularFireAuth, private gplus: GooglePlus,
    private platform: Platform, private navCtrl: NavController) {}

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin().then(promise => {
        this.userMail = promise.email;
        this.navCtrl.navigateRoot('tabs');
      });
    } else {
      this.webGoogleLogin().then(promise => {
        console.log(promise.user.email + ' logged in');
        this.userMail = promise.user.email;
        this.navCtrl.navigateRoot('tabs');
      });
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '300673643373-0eri1s1emv5gsqu99fs7dqdbqpgl1tvh.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));

    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return credential;
    } catch (err) {
      console.log(err);
    }
  }
}
