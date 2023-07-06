import { Injectable } from '@angular/core';
import { TodoService } from '../../todo.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyToDo } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTodoService extends TodoService {

  dailyTodo: DailyToDo;

  dailyTodoSubject = new BehaviorSubject<DailyToDo[]>([]);
  dailyToDos$: Observable<DailyToDo[]> = this.dailyTodoSubject.asObservable();
  dailyToDosLastIdCacheSubject = new BehaviorSubject<number>(0);

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
    this.getDailyToDosLastId();
  }

  getDailyToDosLastId() {
    const maxIdNumber = this.getWeekyTodos().reduce((maxId, dailyToDo) => {
      return dailyToDo.idNumber > maxId ? dailyToDo.idNumber : maxId;
    }, 0);
    this.dailyToDosLastIdCacheSubject.next(maxIdNumber);
  }

  setUniqueId(): string {
    const currentTime = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 13));
    return btoa((currentTime + randomNumber).toString());
  }

  setIdNumber(): number {
    // save new value of dailyToDosLastIdCache
    const idNumber = this.dailyToDosLastIdCacheSubject.getValue() + 1;
    // update dailyToDosLastIdCache with new value
    this.dailyToDosLastIdCacheSubject.next(idNumber);
    return idNumber;
  }
}
