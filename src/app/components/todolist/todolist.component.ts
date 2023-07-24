import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Router } from '@angular/router';
import { Todo } from '../../types';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html'
})
export class TodolistComponent implements OnInit {

  @Input() public todos: Todo[];

  constructor( public tdService: TodoService, private router: Router ) { }

  ngOnInit() {
      const todoStore = JSON.stringify(this.todos);
      localStorage.setItem('todoStore', todoStore);
  }

  showDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  sortTitle(arr: Todo[]) {
    arr.reverse();
    this.tdService.updateTodoStore(arr);
  }

  // sortDeadline(arr: Todo[]) {
  //   arr.sort(this.compare);
  //   this.tdService.updateTodoStore(arr);
  // }
  //
  // compare(a: Todo[], b: Todo[]) {
  //   if ( a.deadline < b.deadline ){
  //       return -1;
  //     }
  //   if ( a.ldeadline > b.deadline ){
  //       return 1;
  //       }
  //   return 0;
  //   }
}
