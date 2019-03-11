import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import uuid from 'uuid/v4';


export interface TodoList {
  uuid: string;
  name: string;
  items: TodoItem[];
}

export interface TodoItem {
  uuid: string;
  name: string;
  desc?: string;
  complete: boolean;
}


@Injectable()
export class TodoServiceProvider {
  private todosCollection: AngularFirestoreCollection<TodoList>;
  private todos$: Observable<TodoList[]>;
  data: TodoList[] = [
    {
      uuid: 'a351e558-29ce-4689-943c-c3e97be0df8b',
      name: 'List 1',
      items: [
        {
          uuid: '7dc94eb4-d4e9-441b-b06b-0ca29738c8d2',
          name: 'Item 1-1',
          complete: false,
          desc: 'je suis sans famille et je m appelle remi et je me balade dans la vie'
        },
        {
          uuid: '20c09bdd-1cf8-43b0-9111-977fc4d343bc',
          name: 'Item 1-2',
          complete: false
        },
        {
          uuid: 'bef88351-f4f1-4b6a-965d-bb1a4fa3b444',
          name: 'Item 1-3',
          complete: true
        }
      ]
    },
    {
      uuid: '90c04913-c1a2-47e5-9535-c7a430cdcf9c',
      name: 'List 2',
      items: [
        {
          uuid: '72849f5f-2ef6-444b-98b0-b50fc019f97c',
          name: 'Item 2-1',
          complete: false
        },
        {
          uuid: '80d4cbbe-1c64-4603-8d00-ee4932045333',
          name: 'Item 2-2',
          complete: true
        },
        {
          uuid: 'a1cd4568-590b-428b-989d-165f22365485',
          name: 'Item 2-3',
          complete: true
        }
      ]
    }
  ];

  constructor(db: AngularFirestore) {
    console.log('Bonjour TodoService');

    this.todosCollection = db.collection<TodoList>('todos');
    // this.todos$.subscribe(todos => this.todos = todos);
    this.todos$ = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public getList(): Observable<TodoList[]> {
    // return of(this.data);
    return this.todos$;
  }

  public getListName(id: String): Observable<String> {
    return of(this.data.find(d => d.uuid === id).name);
  }

  public getTodos(id: string): Observable<TodoItem[]> {
    // return of(this.data.find(d => d.uuid === uuid).items);
    return this.todosCollection.doc<TodoItem[]>(id).valueChanges();
  }

  public editTodo(id: string, editedItem: TodoItem) {
    // const items = this.data.find(d => d.uuid === listUuid).items;
    // const index = items.findIndex(value => value.uuid === editedItem.uuid);
    // items[index] = editedItem;
    this.todosCollection.doc(id).update(editedItem);
  }

  public deleteTodo(id: string) {
    // const items = this.data.find(d => d.uuid === listUuid).items;
    // const index = items.findIndex(value => value.uuid === uuid);
    // if (index !== -1) {
    //   items.splice(index, 1);
    // }
    this.todosCollection.doc(id).delete();
  }

  public newTodoList(name: string) {
    this.data.push({
      uuid : uuid(),
      name : name,
      items : []
    });
  }
}
