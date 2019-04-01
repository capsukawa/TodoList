import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';

import { NavController } from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import { GoogleLoginService } from '../google-login.service';
import { DisconnectedService } from '../disconnected.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.page.html',
  styleUrls: ['./google-login.page.scss'],
})
export class GoogleLoginPage {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private gplus: GooglePlus,
              private platform: Platform, private navCtrl: NavController,
              private gservice: GoogleLoginService, private dservice: DisconnectedService) {
    this.user = this.afAuth.user;
  }

  googleLogin() {
    this.gservice.googleLogin();
  }

  disconnectedMode() {
    this.dservice.activateDisconnectedMode();
    this.navCtrl.navigateRoot('tabs');
  }
}
