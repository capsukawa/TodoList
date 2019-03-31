import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceProvider, TodoItem, TodoList } from '../todo.service';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})



export class ListPage implements OnInit, OnDestroy {

  items: TodoItem[];
  listName: String;
  listUuid: string;
  isInEditModeMap: Map<string, boolean>;
  routeSub: Subscription;
  listSub: Subscription;

  constructor(private route: ActivatedRoute, private todoservice: TodoServiceProvider,
     private alertController: AlertController, private navCtrl: NavController) {}

  @ViewChild('dynamicList') dynamicList;

  ngOnInit() {
    this.isInEditModeMap = new Map();
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.listUuid = id;
    });
    this.listSub = this.todoservice.getTodoList(this.listUuid)
      .subscribe(list => {
        this.items = list.items;
        this.listName = list.name;
      });
  }

  async deleteListPresentAlert() {

    const alert = await this.alertController.create({
      header : 'Supprimer la liste ?',
      message : 'Attention, tous les éléments seront supprimés',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'color : red'
        },
        {
          text: 'Supprimer',
          cssClass: 'dangerbtn',
          handler: data => {
            this.ngOnDestroy();
            this.todoservice.deleteTodoList(this.listUuid);
            this.navCtrl.goBack();
          }
        }
      ]
    });
    return await alert.present();
  }

  async newItemPresentAlert() {

    const alert = await this.alertController.create({
      header : 'Nouvelle tâche',
      inputs: [
        {
          name: 'Nom',
          placeholder: 'Ma super tâche'
        },
        {
          name: 'Description',
          placeholder: 'Ma super description',
          type: 'text'
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
            this.todoservice.newItem(this.listUuid, data.Nom, data.Description);
          }
        }
      ]
    });
    return await alert.present();
  }

  deleteItem(uuid: string) {
    this.dynamicList.closeSlidingItems();
    this.todoservice.deleteTodoItem(this.listUuid, uuid);
  }

  editItemContent(uuid: string) {
    if (!this.isInEditModeMap.has(uuid)) {
      this.isInEditModeMap.set(uuid, true);
    }
  }

  confirmItemContent(item: TodoItem) {
    this.triggerChange(item);
    console.log('edit piaf');
    this.isInEditModeMap.delete(item.uuid);
    if (this.isInEditModeMap.size === 0) {
    }
  }

  isInEditMode(uuid: string): boolean {
    return this.isInEditModeMap.has(uuid);
  }

  triggerChange(item: TodoItem) {
    this.todoservice.updateTodoItem(this.listUuid, item);
  }

  ngOnDestroy(): void {
    this.listSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
