import { Component, OnInit } from '@angular/core';
import { TodoServiceProvider, TodoList } from '../todo.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  lists: TodoList[];

  constructor(
    private todoservice: TodoServiceProvider, private navCtrl: NavController, private alertController: AlertController
  ) {}

  ngOnInit() {
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

  openList(uuid) {
    this.navCtrl.navigateForward(`list/${uuid}`);
  }

  getNumberOfElements(uuid: string) {
    return this.lists.find(list => list.uuid === uuid).items.length;
  }

  deleteList(id: string) {
    this.todoservice.deleteTodoList(id);
  }

}
