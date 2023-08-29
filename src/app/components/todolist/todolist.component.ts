import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { Todo } from '../../types';
import { map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styles: [`
    .todo-mobile-card-body {
      display: flex;
    }
  `]
})
export class TodolistComponent implements OnInit {

  @Input() public todos: Todo[];
  isHandset$: Observable<boolean>;

  constructor( public tdService: TodoService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches));
    const todoStore = JSON.stringify(this.todos);
    // TODO set Item here is not needed, replace with ngrx logic
    localStorage.setItem('todoStore', todoStore);
  }

  showDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  sortTitle(arr: Todo[]) {
    arr.reverse();
    this.tdService.updateTodoStore(arr);
  }

  checkUncompletedTodos(arr: Todo[]): boolean {
    return this.tdService.checkTodosCompletion(arr, false);
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
