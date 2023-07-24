import { Injectable } from '@angular/core';
import { TodoService } from '../../todo.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyToDo } from '../../types';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { WeeklyTodoActions } from '../../store/weekly-to-do.actions';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTodoService extends TodoService {

  dailyTodo: DailyToDo;

  dailyTodoSubject = new BehaviorSubject<DailyToDo[]>([]);
  dailyToDos$: Observable<DailyToDo[]> = this.dailyTodoSubject.asObservable();
  dailyToDosLastIdCacheSubject = new BehaviorSubject<number>(0);

  constructor(private httpWeekly: HttpClient, private store: Store<AppState>) {
    super(httpWeekly);
  }

  completeAllWeeklyTodos() {
    const allWeeklyTodosCompleted = this.getWeeklyTodos().map(dailyTodo => {
      dailyTodo.complete = true;
      return dailyTodo;
    });
    this.updateWeeklyTodos(allWeeklyTodosCompleted);
  }

  deleteAllWeeklyTodos() {
    this.updateWeeklyTodos([]);
  }

  getWeeklyTodos(): DailyToDo[] {
    return this.dailyTodoSubject.getValue();
  }

  updateWeeklyTodos(DailyToDoArr: DailyToDo[], fromServer = false ) {
    this.dailyTodoSubject.next(DailyToDoArr.map(dailyToDo => {
      if (fromServer) {
        dailyToDo.doneDate = new Date(dailyToDo.doneDate);
        // if the doneDate is older than today, than complete dailyToDo
        if (dailyToDo.doneDate.getTime() < new Date().getTime()) dailyToDo.complete = true;
      }
      return dailyToDo;
    }));
  }

  updateWeeklyTodosLocalStorage(arr: DailyToDo[]) {
    const todoStore = JSON.stringify(arr);
    localStorage.setItem('weeklyTodoStore', todoStore);
  }

  getWeeklyTodosLocalStorage() {
    const weeklyTodosStore = JSON.parse(localStorage.getItem('weeklyTodoStore'));
    (weeklyTodosStore !== null) ? this.updateWeeklyTodos(weeklyTodosStore, true) : this.updateWeeklyTodos([]);
    this.setDailyToDosLastData();
  }

  setDailyToDosLastData() {
    let doneDate: Date;
    const maxIdNumber = this.getWeeklyTodos().reduce((maxId, dailyToDo) => {
      return dailyToDo.idNumber > maxId ? dailyToDo.idNumber : maxId;
    }, 0);
    // tslint:disable-next-line:max-line-length
    doneDate = (maxIdNumber === 0) ? new Date() : this.getWeeklyTodos().filter(dailyToDo => dailyToDo.idNumber === maxIdNumber)[0].doneDate;
    this.dailyToDosLastIdCacheSubject.next(maxIdNumber);
    this.store.dispatch(WeeklyTodoActions.setDoneDate({doneDate}));
  }

  getDailyToDosLastId(): number {
    return this.dailyToDosLastIdCacheSubject.getValue();
  }

  setUniqueId(): string {
    const currentTime = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 13));
    return (currentTime + randomNumber).toString(36);
  }

  setIdNumber(): number {
    // save new value of dailyToDosLastIdCache
    const idNumber = this.getDailyToDosLastId() + 1;
    // update dailyToDosLastIdCache with new value
    this.dailyToDosLastIdCacheSubject.next(idNumber);
    return idNumber;
  }
}
