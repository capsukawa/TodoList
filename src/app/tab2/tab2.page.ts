import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

import { TodoServiceProvider, TodoList } from '../todo.service';
import { GoogleLoginService } from '../google-login.service';
import { DisconnectedService } from '../disconnected.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  lists: TodoList[];
  user: firebase.User;
  userMail: string;

  constructor(private todoservice: TodoServiceProvider, private navCtrl: NavController,
              private alertController: AlertController, private afAuth: AngularFireAuth,
              private gservice: GoogleLoginService, private dservice: DisconnectedService,
              private events: Events) {}

  ngOnInit() {
    if (this.dservice.isInDisconnectedMode) {
      this.disconnectedRefresh();
      this.events.subscribe('disconnectedRefreshList', () => {
        this.disconnectedRefresh();
      });
    } else {
      this.afAuth.user.subscribe(user => this.user = user);
      this.userMail = this.gservice.userMail;
      this.todoservice.getTodoLists().subscribe(lists => this.lists = lists);
    }
  }


  async newListPresentAlert() {

    const alert = await this.alertController.create({
      header : 'Nouvelle liste',
      inputs: [
        {
          name: 'Nom',
          placeholder: 'Ma super liste'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Créer',
          cssClass: 'successbtn',
          handler: data => {
            if (this.dservice.isInDisconnectedMode) {
              this.dservice.newTodoList(data.Nom);
              this.disconnectedRefresh();
            } else {
              this.todoservice.newTodoList(data.Nom);
            }
          }
        }
      ]
    });
    return await alert.present();
  }

  openList(uuid: string) {
    this.navCtrl.navigateForward(`list/${uuid}`);
  }

  getNumberOfElements(uuid: string) {
    return this.lists.find(list => list.uuid === uuid).items.length;
  }

  disconnectedRefresh(delay?: number) {
    setTimeout( () => {
      this.dservice.getTodoLists().then(lists => {
        this.lists = lists;
      });
    }, delay ? delay : 200 );
  }

}
