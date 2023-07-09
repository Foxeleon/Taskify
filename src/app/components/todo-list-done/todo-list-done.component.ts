import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Todo } from '../../types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectTabIndex } from '../../store/home.selector';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HomeActions } from '../../store/home.actions';

@Component({
  selector: 'app-todo-list-done',
  templateUrl: './todo-list-done.component.html',
  styleUrls: ['./todo-list-done.component.css']
})
export class TodoListDoneComponent implements OnInit {

  public todos = [];
  tabIndex$: Observable<number>;

  constructor( public tdService: TodoService, private store: Store<AppState> ) { }

  ngOnInit() {
    this.tabIndex$ = this.store.select(selectTabIndex);
    this.tdService.allTodos = JSON.parse(localStorage.getItem('todoStore'));
    if (this.tdService.allTodos == null) {
      this.tdService.allTodos = [];
    }
    this.todos = this.tdService.allTodos.filter(this.createDoneList);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.store.dispatch(HomeActions.setTabIndex({appTabIndex: tabChangeEvent.index}));
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
