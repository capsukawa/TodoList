import { Component, OnInit } from '@angular/core';
import { TodoServiceProvider, TodoList } from '../todo.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  lists: TodoList[];

  constructor(
    private todoservice: TodoServiceProvider, private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.todoservice.getList().subscribe(lists => this.lists = lists);
  }

  openList(uuid) {
    console.log(uuid);
    this.navCtrl.navigateForward(`list/${uuid}`);
  }

  getNumberOfElements(uuid) {
    let n: number;
    this.todoservice.getTodos(uuid).subscribe(list => n = list.length);
    return n;
  }


}
