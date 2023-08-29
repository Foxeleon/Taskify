import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, User } from '../types';
import { Observable } from 'rxjs';
import { DeleteWarningDialogComponent } from '../components/delete-warning-dialog/delete-warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  allTodos: any;
  todoId: number;
  userId: string;
  currDay = new Date();
  todo: Todo;
  user: User;
  allUsers: User[];
  private url = '../assets/initTodos.json';
  private users = '../assets/users.json';

  constructor( private http: HttpClient, public matDialog: MatDialog ) { }

  checkTodosCompletion(arr: Todo[], checkCompletes: boolean): boolean {
    return checkCompletes ? arr.some(todo => todo.complete) : arr.some(todo => !todo.complete);
  }

  getTodos() {
    return this.http.get(this.url);
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.users) as Observable<User[]>;
  }

  setUserId() {
    return this.userId = Date.now().toString(36);
  }

  yyyymmdd(date: Date) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [date.getFullYear() + ('-'),
            (mm > 9 ? '' : '0') + mm + ('-'),
            (dd > 9 ? '' : '0') + dd
           ].join('');
  }

  completeTodo(arr: Todo[], index: number) {
    if (arr[index].complete === false) {
      arr[index].complete = true;
      arr[index].doneDate = this.yyyymmdd(this.currDay);
      } else {
        arr[index].complete = false;
        arr[index].doneDate = '';
      }
    this.updateTodoStore(arr);
  }

  openDeleteDialog(titleMessage: string) {
    return this.matDialog.open(DeleteWarningDialogComponent, {
      width: '350px',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '150ms',
      data: { titleMessageData: titleMessage },
    });
  }

  deleteTodo(arr: Todo[], i: number) {
    const dialogRef = this.openDeleteDialog('DeleteDailyTodoTitle');

    dialogRef.afterClosed().subscribe(deleteTodo => {
      if (deleteTodo) {
        arr.splice(i, 1);
        this.updateTodoStore(arr);
      }
    });
  }

  updateTodo(arr: Todo[], i: number) {
      arr.splice(i, 1);
      this.updateTodoStore(arr);
      // TODO
  }

  clearToDoList(arr: Todo[]) {
    arr.length = 0;
    this.updateTodoStore(arr);
  }

  completeAll(arr: Todo[]) {
    for (const j in arr) {
    if (arr[j].complete === false) {
      arr[j].complete = true;
      arr[j].doneDate = this.yyyymmdd(this.currDay);
      }
    }
    this.updateTodoStore(arr);
  }

  updateTodoStore(arr: Todo[]) {
    const todoStore = JSON.stringify(arr);
    localStorage.setItem('todoStore', todoStore);
  }

  updateUsers(arr: User[]) {
    const usersStore = JSON.stringify(arr);
    localStorage.setItem('users', usersStore);
  }
}
