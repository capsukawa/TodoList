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
    this.todoservice.getList().subscribe(lists => this.lists = lists);
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
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('You Clicked on Cancel');
          }
        },
        {
          text: 'Login',
          handler: data => { this.todoservice.newTodoList(data.Nom);
          }
        }
      ]
    });
    return await alert.present();
  }

  openList(uuid) {
    console.log(uuid);
    this.navCtrl.navigateForward(`list/${uuid}`);
  }

  getNumberOfElements(uuid) {
    let n: number;
    this.todoservice.getTodos(uuid).subscribe(list => n = list.length);
    return n;
  }

}
