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
  dailyToDos$: Observable<DailyToDo[]> = this.dailyTodoSubject.asObservable();

  constructor(private httpWeekly: HttpClient) {
    super(httpWeekly);
  }

  getWeekyTodos(): DailyToDo[] {
    return this.dailyTodoSubject.getValue();
  }

  updateWeekyTodos(DailyToDoArr: DailyToDo[] ) {
    this.dailyTodoSubject.next(DailyToDoArr);
  }

  updateWeekyTodosLocalStorage(arr: DailyToDo[]) {
    const todoStore = JSON.stringify(arr);
    localStorage.setItem('weeklyTodoStore', todoStore);
  }

  getWeeklyTodosLocalStorage() {
    const weeklyTodosStore = JSON.parse(localStorage.getItem('weeklyTodoStore'));
    (weeklyTodosStore !== null) ? this.updateWeekyTodos(weeklyTodosStore) : this.updateWeekyTodos([]);
  }
}
