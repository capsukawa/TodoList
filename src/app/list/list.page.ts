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

  @Output()
  deleteListEvent = new EventEmitter<string>();

  @Output()
  deleteItemEvent = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private todoservice: TodoServiceProvider) {}

  ngOnInit() {
    this.isInEditModeMap = new Map();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.listUuid = id;
      this.todoservice.getList(id).subscribe(list => {this.items = list.items; this.listName = list.name; });
      this.listName = 'ListName(temp)';
    });
  }

  deleteList() {
    console.log('deleting list of id' + this.listUuid);
    // TODO Delete in base
  }

  deleteItem(uuid: string) {
    console.log('deleting item of id' + uuid + 'of list' + this.listUuid);
    // TODO Delete in base
  }

  editItemContent(uuid: string) {
    if (!this.isInEditModeMap.has(uuid)) {
      this.isInEditModeMap.set(uuid, true);
    }
  }

  confirmItemContent(uuid: string) {
    // TODO Base
    this.isInEditModeMap.delete(uuid);
  }

  isInEditMode(uuid: string): boolean {
    console.log(this.isInEditModeMap.has(uuid));
    return this.isInEditModeMap.has(uuid);
  }
}
