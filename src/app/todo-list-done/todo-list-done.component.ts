import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../types';

@Component({
  selector: 'app-todo-list-done',
  templateUrl: './todo-list-done.component.html',
  styleUrls: ['./todo-list-done.component.css']
})
export class TodoListDoneComponent implements OnInit {

  public todos = [];

  constructor( public tdService: TodoService ) { }

  ngOnInit() {
    this.tdService.allTodos = JSON.parse(localStorage.getItem('todoStore'));
    if (this.tdService.allTodos == null) {
      this.tdService.allTodos = [];
    }
    this.todos = this.tdService.allTodos.filter(this.createDoneList);
  }

  checkCompletedTodos(arr: Todo[]) {
    for (const i in arr) {
      if (arr[i].complete !== false) {
        return true;
        }
    }
  }

  createDoneList(value: any, index: number, arr: Todo[]) {
    return (arr[index].complete !== false);
    }

}
