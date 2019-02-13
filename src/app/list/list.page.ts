import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceProvider, TodoItem } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  items: TodoItem[];
  listName: String;

  constructor(private route: ActivatedRoute, private todoservice: TodoServiceProvider) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.todoservice.getTodos(id).subscribe(items => this.items = items);
      this.todoservice.getListName(id).subscribe(listName => this.listName = listName);
    });
  }

  deleteCard(item) {
    console.log(item);
  }
}
