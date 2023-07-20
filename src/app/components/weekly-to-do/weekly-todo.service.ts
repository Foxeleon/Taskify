import { Injectable } from '@angular/core';
import { TodoService } from '../../todo.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyToDo, DoneDate } from '../../types';
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
    this.setDailyToDosLastData();
  }

  setDailyToDosLastData() {
    let doneDate: DoneDate;
    const maxIdNumber = this.getWeekyTodos().reduce((maxId, dailyToDo) => {
      return dailyToDo.idNumber > maxId ? dailyToDo.idNumber : maxId;
    }, 0);
    // tslint:disable-next-line:max-line-length
    doneDate = (maxIdNumber === 0) ? {date: new Date(), dateString: this.yyyymmdd(new Date())} : this.getWeekyTodos().filter(dailyToDo => dailyToDo.idNumber === maxIdNumber)[0].doneDate;
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
