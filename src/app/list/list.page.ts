import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceProvider, TodoItem, TodoList } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  items: TodoItem[];
  listName: String;
  listUuid: string;
  isInEditModeMap: Map<string, boolean>;

  constructor(private route: ActivatedRoute, private todoservice: TodoServiceProvider) {}

  ngOnInit() {
    this.isInEditModeMap = new Map();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.listUuid = id;
    });
    this.todoservice.getTodoList(this.listUuid)
      .subscribe(list => {
        this.items = list.items;
        this.listName = list.name;
      });
  }

  deleteItem(uuid: string) {
    this.todoservice.deleteTodoItem(this.listUuid, uuid);
  }

  editItemContent(uuid: string) {
    if (!this.isInEditModeMap.has(uuid)) {
      this.isInEditModeMap.set(uuid, true);
    }
  }

  confirmItemContent(item: TodoItem) {
    // this.todoservice.updateTodoItem(this.listUuid, item.uuid, item);
    console.log('edit piaf');
    this.isInEditModeMap.delete(item.uuid);
  }

  isInEditMode(uuid: string): boolean {
    return this.isInEditModeMap.has(uuid);
  }
}
