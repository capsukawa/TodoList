import { Injectable } from '@angular/core';
import uuid from 'uuid/v4';

import { TodoList, TodoItem } from './todo.service';

import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DisconnectedService {
  isInDisconnectedMode: boolean;

  constructor(private localStorage: Storage, private alertController: AlertController) {
    this.isInDisconnectedMode = false;
  }

  public activateDisconnectedMode() {
    this.isInDisconnectedMode = true;
  }

  public getTodoLists(): Promise<TodoList[]> {
    return this.localStorage.get('todos');
  }

  public async newTodoList(name: string) {
    const id: string = uuid();
    this.getTodoLists().then(todoLists => {
      if (todoLists === null) {
        todoLists = [];
      } else {
        todoLists.push({uuid: id, name: name, items: []});
      }
      this.localStorage.set('todos', todoLists);
    });
  }

  public deleteTodoList(id: string) {
    this.getTodoLists().then(todoLists => {
      if (todoLists === null) {
        todoLists = [];
      } else {
        todoLists.map(todoList => {
          if (todoList.uuid === id) {
            const index = todoLists.indexOf(todoList);
            if (index > -1) {
              todoLists.splice(index, 1);
            }
          }
        });
      }
      this.localStorage.set('todos', todoLists);
    });
  }

  public newItem(listId: string, name: string, desc: string) {
    const id: string = uuid();
    this.getTodoLists().then(todoLists => {
      if (todoLists === null) {
        todoLists = [];
      } else {
        todoLists.map(todoList => {
          if (todoList.uuid === listId) {
            todoList.items.push({
              uuid: id,
              name: name,
              desc: desc,
              complete: false
            });
          }
        });
      }
      this.localStorage.set('todos', todoLists);
    });
  }

  public updateTodoItem(listId: string, newItem: TodoItem) {
    this.getTodoLists().then(todoLists => {
      if (todoLists === null) {
        todoLists = [];
      } else {
        todoLists.map(todoList => {
          if (todoList.uuid === listId) {
            const index = todoLists.indexOf(todoList);
            const itemIndex = todoList.items.indexOf(todoList.items.find(item => item.uuid === newItem.uuid));
            if (index > -1 && itemIndex > -1) {
              todoLists[index].items[itemIndex] = newItem;
            }
          }
        });
      }
      this.localStorage.set('todos', todoLists);
    });
  }

  public deleteTodoItem(listId: string, itemId: string) {
    this.getTodoLists().then(todoLists => {
      if (todoLists === null) {
        todoLists = [];
      } else {
        todoLists.map(todoList => {
          if (todoList.uuid === listId) {
            const index = todoLists.indexOf(todoList);
            const itemIndex = todoList.items.indexOf(todoList.items.find(item => item.uuid === itemId));
            if (index > -1 && itemIndex > -1) {
              todoLists[index].items.splice(index, 1);
            }
          }
        });
      }
      this.localStorage.set('todos', todoLists);
    });
  }

  async disconnectedServiceErrorPresentAlert(errorMessage: string) {

    const alert = await this.alertController.create({
      header : 'Erreur',
      message : errorMessage,
      buttons: ['OK']
    });
    return await alert.present();
  }
}
