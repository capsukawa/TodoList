import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import uuid from 'uuid/v4';

import { TodoList } from './todo.service';

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

  public getTodoLists(): Observable<TodoList[]> {
    let store: TodoList[];
    this.localStorage.get('todos').then(promise => store = promise);
    return of(store);
  }

  public newTodoList(name: string) {
    console.log(this.localStorage.length());
    const id: string = uuid();
    this.getTodoLists().take(1).subscribe(todos => {
      todos.push({uuid: id, name: name, items: []});
      this.localStorage.set('todos', todos);
      console.log(this.localStorage.length());
    });
  }

  public deleteTodoList(id: string) {
    console.log('delete');
  }
}
