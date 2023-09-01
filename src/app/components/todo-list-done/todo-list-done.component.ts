import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { DailyToDo, Todo } from '../../types';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectTabIndex } from '../../store/home/home.selector';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HomeActions } from '../../store/home/home.actions';
import { WeeklyTodoService } from '../weekly-to-do/weekly-todo.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-todo-list-done',
  templateUrl: './todo-list-done.component.html'
})
export class TodoListDoneComponent implements OnInit {

  todos$: Observable<Todo[]>;
  tabIndex$: Observable<number>;
  dailyToDosCompleted$: Observable<DailyToDo[]>;
  isHandset$: Observable<boolean>;

  constructor( public tdService: TodoService, private store: Store<AppState>, private weeklyTodoService: WeeklyTodoService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches));
    this.tabIndex$ = this.store.select(selectTabIndex);
    this.dailyToDosCompleted$ = this.weeklyTodoService.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo => dailyTodo.complete)));
    this.todos$ = this.tdService.getTodosObservable();
    this.todos$.subscribe(todos => console.log('todos', todos));
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.store.dispatch(HomeActions.setTabIndex({appTabIndex: tabChangeEvent.index}));
  }

  checkCompletedTodos(arr: Todo[]): boolean {
    return this.tdService.checkTodosCompletion(arr, true);
  }
}
