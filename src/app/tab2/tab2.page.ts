import { Component, OnInit } from '@angular/core';
import { TodoServiceProvider, TodoList } from '../todo.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  lists: TodoList[];
  user: firebase.User;

  constructor(private todoservice: TodoServiceProvider, private navCtrl: NavController,
              private alertController: AlertController, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.user.subscribe(user => this.user = user);
    this.todoservice.getTodoLists().subscribe(lists => this.lists = lists);
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
          handler: data => { this.todoservice.newTodoList(data.Nom);
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
    this.todoservice.deleteTodoList(id);
  }

}
