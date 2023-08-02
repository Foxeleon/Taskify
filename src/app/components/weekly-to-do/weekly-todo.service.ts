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
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTodoService extends TodoService {

  dailyTodo: DailyToDo;

  dailyTodoSubject = new BehaviorSubject<DailyToDo[]>([]);
  dailyToDos$: Observable<DailyToDo[]> = this.dailyTodoSubject.asObservable();
  dailyToDosLastIdCacheSubject = new BehaviorSubject<number>(0);

  constructor(private httpWeekly: HttpClient,
              private store: Store<AppState>,
              public matDialog: MatDialog) {
                super(httpWeekly);
              }

  backupWeeklyTodosToFile() {
    const backupData = btoa(JSON.stringify(this.getWeeklyTodos()));
    const date = new Date();
    const fileName = 'Taskify' + '-backup-' + this.yyyymmdd(date) + ('_') + date.getHours() + (':') + date.getMinutes();
    const blob = new Blob([backupData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  }

  restoreWeeklyTodosFromFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.updateWeeklyTodos(JSON.parse(atob(e.target.result)), true);
    };
    reader.readAsText(file);
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

  patchTodo = (todo: DailyToDo, meaning: string, result: EditDialogData): DailyToDo => {
    let patchedTodo: DailyToDo;
    switch (meaning) {
      case 'Target':
        patchedTodo = { ...todo, titleTarget: result.title, todoTextTarget: result.text };
        break;
      case 'Part':
        patchedTodo = { ...todo, titlePart: result.title, todoTextPart: result.text };
        break;
      case 'LongBox':
        patchedTodo = { ...todo, titleLongBox: result.title, todoTextLongBox: result.text };
        break;
      case 'PersonalGrowth':
        patchedTodo = { ...todo, titlePersonalGrowth: result.title, todoTextPersonalGrowth: result.text };
        break;
      default:
        console.error('an error occurred. Todo was not updated. function params: ', {todo, meaning, result});
        patchedTodo = todo;
    }
    return patchedTodo;
  }

  editWeeklyTodo(uniqueId: string, meaning: string) {
    const weeklyTodosArray = this.getWeeklyTodos();
    const todoToEdit = weeklyTodosArray.find(dailyTodo => dailyTodo.uniqueId === uniqueId);
    const editDialogData: EditDialogData = this.getTitleAndTextOfTodo(todoToEdit, meaning);
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      width: '350px',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '150ms',
      disableClose: true,
      data: { title: editDialogData.title, text: editDialogData.text },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const patchedTodo = this.patchTodo(todoToEdit, meaning, result);
        const dailyTodoIndex = weeklyTodosArray.findIndex(dailyTodo => dailyTodo.uniqueId === uniqueId);
        weeklyTodosArray[dailyTodoIndex] = patchedTodo;
        this.updateWeeklyTodos(weeklyTodosArray);
      }
    });
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
