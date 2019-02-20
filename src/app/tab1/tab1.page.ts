import { Component, OnInit } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private firebase: Firebase) { }

  ngOnInit(): void {
    this.firebase.getToken()
    .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
    .catch(error => console.error('Error getting token', error));

    this.firebase.onNotificationOpen()
      .subscribe(data => console.log(`User opened a notification ${data}`));

    this.firebase.onTokenRefresh().subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

  }




