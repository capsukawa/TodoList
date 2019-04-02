import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceProvider, TodoItem, TodoList } from '../todo.service';
import { AlertController, NavController, Events } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { DisconnectedService } from '../disconnected.service';

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
  disableSlide = false;

  constructor(private route: ActivatedRoute, private todoservice: TodoServiceProvider,
     private alertController: AlertController, private navCtrl: NavController,
     private speechRecognition: SpeechRecognition, private dservice: DisconnectedService,
     private events: Events) {}

  @ViewChild('dynamicList') dynamicList;

  ngOnInit() {
    this.isInEditModeMap = new Map();
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.listUuid = id;
    });

    if (this.dservice.isInDisconnectedMode) {
      this.disconnectedRefresh();
    } else {
      this.listSub = this.todoservice.getTodoList(this.listUuid)
      .subscribe(list => {
        this.items = list.items;
        this.listName = list.name;
      });
    }
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
            if (this.dservice.isInDisconnectedMode) {
              this.dservice.deleteTodoList(this.listUuid);
              this.navCtrl.goBack();
              this.publishRefreshList();
            } else {
              this.ngOnDestroy();
              this.todoservice.deleteTodoList(this.listUuid);
              this.navCtrl.goBack();
            }
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
          placeholder: 'Ma super description'
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
              this.dservice.newItem(this.listUuid, data.Nom, data.Description);
              this.disconnectedRefresh();
            } else {
              this.todoservice.newItem(this.listUuid, data.Nom, data.Description);
            }
          }
        }
      ]
    });
    return await alert.present();
  }

  deleteItem(uuid: string) {
    this.dynamicList.closeSlidingItems();
    if (this.dservice.isInDisconnectedMode) {
      this.dservice.deleteTodoItem(this.listUuid, uuid);
      this.disconnectedRefresh();
    } else {
      this.todoservice.deleteTodoItem(this.listUuid, uuid);
    }
  }

  editItemContent(uuid: string) {
    if (!this.isInEditModeMap.has(uuid)) {
      this.isInEditModeMap.set(uuid, true);
      this.disableSlide = true;
    }
  }

  confirmItemContent(item: TodoItem) {
    this.triggerChange(item);
    this.isInEditModeMap.delete(item.uuid);
    if (this.isInEditModeMap.size === 0) {
      this.disableSlide = false;
    }
  }

  isInEditMode(uuid: string): boolean {
    return this.isInEditModeMap.has(uuid);
  }

  triggerChange(item: TodoItem) {
    if (this.dservice.isInDisconnectedMode) {
      this.dservice.updateTodoItem(this.listUuid, item);
      this.disconnectedRefresh();
    } else {
      this.todoservice.updateTodoItem(this.listUuid, item);
    }
  }

  requestPermisssion() {
    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    );
  }

  disconnectedRefresh() {
    setTimeout( () => {
      this.dservice.getTodoLists().then(lists => {
        const rightList: TodoList = lists.find(list => list.uuid === this.listUuid);
        this.items = rightList.items;
        this.listName = rightList.name;
      });
    }, 150 );
  }

  publishRefreshList() {
    this.events.publish('disconnectedRefreshList', null);
  }

  ngOnDestroy(): void {
    if (!this.dservice.isInDisconnectedMode) {
      this.listSub.unsubscribe();
      this.routeSub.unsubscribe();
    }
  }
}
