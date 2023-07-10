import { Injectable } from '@angular/core';
import { TodoService } from '../../todo.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyToDo } from '../../types';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { WeeklyTodoActions } from '../../store/weekly-to-do.actions';
import { selectDailyToDos, selectDailyToDosLastId } from '../../store/weekly-to-do.selector';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTodoService extends TodoService {

  dailyTodo: DailyToDo;

  constructor(private httpWeekly: HttpClient, private store: Store<AppState>) {
    super(httpWeekly);
  }

  getWeekyTodos(): Observable<DailyToDo[]> {
    return this.store.select(selectDailyToDos);
  }

  updateWeekyTodos(DailyToDoArr: DailyToDo[] ) {
    this.store.dispatch(WeeklyTodoActions.setDailyToDos({dailyToDos: DailyToDoArr}));
  }

  updateWeekyTodosLocalStorage(arr: DailyToDo[]) {
    const todoStore = JSON.stringify(arr);
    localStorage.setItem('weeklyTodoStore', todoStore);
  }

  getWeeklyTodosLocalStorage() {
    const weeklyTodosStore: DailyToDo[] = JSON.parse(localStorage.getItem('weeklyTodoStore'));
    (weeklyTodosStore !== null) ? this.updateWeekyTodos(weeklyTodosStore) : this.updateWeekyTodos([]);
    this.getDailyToDosLastId();
  }

  getDailyToDosLastId() {
    this.getWeekyTodos().subscribe(dailyTodosArr => {
      const maxIdNumber = dailyTodosArr.reduce((maxId, dailyToDo) => {
        return dailyToDo.idNumber > maxId ? dailyToDo.idNumber : maxId;
      }, 0);
      this.store.dispatch(WeeklyTodoActions.setDailyToDosLastId({dailyToDosLastId: maxIdNumber}));
    });
  }

  setUniqueId(): string {
    const currentTime = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 13));
    return (currentTime + randomNumber).toString(36);
  }

  setIdNumber(): number {
    let idNumber: number;
    this.store.select(selectDailyToDosLastId).subscribe(lastId => {
      // save new value of dailyToDosLastIdCache
      idNumber = lastId + 1;
      // update dailyToDosLastIdCache with new value
      this.store.dispatch(WeeklyTodoActions.setDailyToDosLastId({dailyToDosLastId: idNumber}));
    });
    return idNumber;
  }
}
