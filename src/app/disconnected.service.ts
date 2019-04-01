import { Injectable } from '@angular/core';
import { TodoList } from './todo.service';
import uuid from 'uuid/v4';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DisconnectedService {
  isInDisconnectedMode: boolean;

  constructor(private localStorage: Storage) {
    this.isInDisconnectedMode = false;
  }

  public activateDisconnectedMode() {
    this.isInDisconnectedMode = true;
  }

  public getTodoLists(): TodoList[] {
    if (this.localStorage.length.length === 0) {
      return [];
    } else {
      let store: TodoList[];
      this.localStorage.get('todos').then(promise => store = promise);
      return store;
    }
  }

  public newTodoList(name: string) {
    const todos = this.getTodoLists();
    const id: string = uuid();
    todos.push({uuid: id, name: name, items: []});
    this.localStorage.set('todos', todos);
    console.log('new');
  }

  public deleteTodoList(id: string) {
    console.log('delete');
  }
}
