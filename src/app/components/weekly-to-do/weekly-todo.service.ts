import { Injectable } from '@angular/core';
import { TodoService } from '../../todo.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DailyToDo, EditDialogData } from '../../types';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { WeeklyTodoActions } from '../../store/weekly-to-do.actions';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTodoService extends TodoService {

  dailyTodo: DailyToDo;

  dailyTodoSubject = new BehaviorSubject<DailyToDo[]>([]);
  dailyToDos$: Observable<DailyToDo[]> = this.dailyTodoSubject.asObservable();
  dailyToDosLastIdCacheSubject = new BehaviorSubject<number>(0);

  constructor(private httpWeekly: HttpClient, private store: Store<AppState>, public matDialog: MatDialog) {
    super(httpWeekly);
  }

  completeAllWeeklyTodos() {
    const allWeeklyTodosCompleted = this.getWeeklyTodos().map(dailyTodo => {
      dailyTodo.complete = true;
      return dailyTodo;
    });
    this.updateWeeklyTodos(allWeeklyTodosCompleted);
  }

  deleteAllUncompletedWeeklyTodos() {
    this.updateWeeklyTodos(this.getWeeklyTodos().filter(dailyTodo => dailyTodo.complete));
  }

  deleteAllWeeklyTodos() {
    this.dailyToDosLastIdCacheSubject.next(0);
    this.updateWeeklyTodos([]);
  }

  deleteWeeklyTodo(uniqueId: string) {
    const patchedWeeklyTodosArray = this.getWeeklyTodos().filter(dailyTodo => dailyTodo.uniqueId !== uniqueId);
    this.updateWeeklyTodos(patchedWeeklyTodosArray);
  }

  getTitleAndTextOfTodo = (todo: DailyToDo, meaning: string): EditDialogData => {
    let editDialogData: EditDialogData;
    switch (meaning) {
      case 'Target':
        editDialogData = {title: todo.titleTarget, text: todo.todoTextTarget};
        break;
      case 'Part':
        editDialogData = {title: todo.titlePart, text: todo.todoTextPart};
        break;
      case 'LongBox':
        editDialogData = {title: todo.titleLongBox, text: todo.todoTextLongBox};
        break;
      case 'PersonalGrowth':
        editDialogData = {title: todo.titlePersonalGrowth, text: todo.todoTextPersonalGrowth};
        break;
      default:
        editDialogData = {title: '', text: ''};
    }
    return editDialogData;
  }

  editWeeklyTodo(uniqueId: string, meaning: string) {
    const weeklyTodosArray = this.getWeeklyTodos();
    const TodoToEdit = weeklyTodosArray.find(dailyTodo => dailyTodo.uniqueId === uniqueId);
    const editDialogData: EditDialogData = this.getTitleAndTextOfTodo(TodoToEdit, meaning);
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      width: 'auto',
      data: { title: editDialogData.title, text: editDialogData.text },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

    const patchedWeeklyTodosArray = this.getWeeklyTodos().map(dailyTodo => {
      if (dailyTodo.uniqueId === uniqueId) {
        switch (meaning) {
          case 'Target':
            console.log(dailyTodo.todoTextTarget);
            break;
          case 'Part':
            console.log(dailyTodo.todoTextPart);
            break;
          case 'LongBox':
            console.log(dailyTodo.todoTextLongBox);
            break;
          case 'PersonalGrowth':
            console.log(dailyTodo.todoTextPersonalGrowth);
            break;
        }
      }
      return dailyTodo;
    });
    this.updateWeeklyTodos(patchedWeeklyTodosArray);
  }

  getWeeklyTodos(): DailyToDo[] {
    return this.dailyTodoSubject.getValue();
  }

  updateWeeklyTodos(DailyToDoArr: DailyToDo[], fromServer = false ) {
    this.dailyTodoSubject.next(DailyToDoArr.map(dailyToDo => {
      if (fromServer) {
        dailyToDo.doneDate = new Date(dailyToDo.doneDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // if the doneDate is older than today, than complete dailyToDo
        if (dailyToDo.doneDate.getTime() < today.getTime()) dailyToDo.complete = true;
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
