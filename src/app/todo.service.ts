import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
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
  private todosCollection$: Observable<TodoList[]>;
  private todos: TodoList[] = [];
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

  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<TodoList>('todos');
    this.todosCollection$ = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.todosCollection$.subscribe(todos => this.todos = todos);
  }

  public getTodoLists(): Observable<TodoList[]> {
    return this.todosCollection$;
  }

  public getTodoListsValue(): TodoList[] {
    return this.todos;
  }

  public getTodoList(listId: string): Observable<TodoList> {
    // return this.db.collection('todos', ref => ref.where('uuid', '==', listId)).snapshotChanges()[0].pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );
    // return of(this.todos.find(list => list.uuid === uuid));
  }

  public deleteTodoList(id: string) {
    this.db.collection('todos', ref => ref.where('uuid', '==', id))
    .snapshotChanges().take(1).subscribe(docs => docs.forEach(v => v.payload.doc.ref.delete()));
  }

  public updateTodoList(id: string, list: TodoList) {
    this.db.collection('todos', ref => ref.where('uuid', '==', id))
    .snapshotChanges().take(1).subscribe(docs => docs.forEach(v => v.payload.doc.ref.update(list)));
  }

  public newTodoList(name: string) {
    const id: string = uuid();
    this.todosCollection.doc(id).set({
      uuid: id,
      name: name,
      items: [{
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
      }]
    });
  }

  // public newItem(listName: string, name: string, desc?: string) {
  //   const id: string = uuid();
  //   this.db.collection('todos', ref => ref.where('uuid', '==', id))
  //   .snapshotChanges().subscribe(docs => docs.forEach(v => v.doc(id)));
  // }

}
