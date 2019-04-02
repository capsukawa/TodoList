import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
              private gservice: GoogleLoginService, private dservice: DisconnectedService) {}

  ngOnInit() {
    if (this.dservice.isInDisconnectedMode) {
      this.dservice.getTodoLists().subscribe(lists => this.lists = lists);
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
            this.dservice.isInDisconnectedMode ? this.dservice.newTodoList(data.Nom) : this.todoservice.newTodoList(data.Nom);
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

  deleteList(id: string) {
    this.dservice.isInDisconnectedMode ? this.dservice.deleteTodoList(id) : this.todoservice.deleteTodoList(id);
  }

}
