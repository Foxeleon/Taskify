import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyToDo } from './types';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTodoService extends TodoService {

  dailyTodo: DailyToDo;

  dailyTodoSubject = new BehaviorSubject<DailyToDo[]>([]);
  dailyTodos: Observable<DailyToDo[]> = this.dailyTodoSubject.asObservable();

  constructor(private httpWeekly: HttpClient) {
    super(httpWeekly);
  }

  updateWeekyTodos(DailyToDoArr: DailyToDo[] ) {
    this.dailyTodoSubject.next(DailyToDoArr);
  }

  updateWeekyTodosStore(arr: DailyToDo[]) {
    const todoStore = JSON.stringify(arr);
    localStorage.setItem('weeklyTodoStore', todoStore);
  }

  getWeeklyTodosStore() {
    const weeklyTodosStore = JSON.parse(localStorage.getItem('weeklyTodoStore'));
    (weeklyTodosStore !== null) ? this.updateWeekyTodos(weeklyTodosStore) : this.updateWeekyTodos([]);
  }
}
