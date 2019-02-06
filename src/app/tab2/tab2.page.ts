import { Component, OnInit } from '@angular/core';
import { TodoServiceProvider, TodoList } from '../todo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  constructor(private todoservice: TodoServiceProvider) {}

  ngOnInit() {
    
  }

  openList() {
    console.log('bloup');
  }



}
