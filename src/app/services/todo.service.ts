import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DailyToDo, Todo, User } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteWarningDialogComponent } from '../components/delete-warning-dialog/delete-warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnInit {
  user: User;
  userId: string;
  allUsers: User[];
  private users = '../assets/users.json';

  allTodos: Todo[];
  todoId: number;
  currDay = new Date();
  todo: Todo;
  private url = '../assets/initTodos.json';
  toDosSubject = new BehaviorSubject<Todo[]>([]);
  toDos$: Observable<Todo[]> = this.toDosSubject.asObservable();

  constructor( private http: HttpClient, public matDialog: MatDialog, private store: Store<AppState>) { }

  checkTodosCompletion(arr: Todo[], checkCompletes: boolean): boolean {
    return checkCompletes ? arr.some(todo => todo.complete) : arr.some(todo => !todo.complete);
  }

  getTodos(): Observable<Todo[]> {
    return this.toDos$;
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

  setUniqueId(): string {
    const currentTime = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 13));
    return (currentTime + randomNumber).toString(36);
  }

  updateTodoStore(arr: Todo[]) {
    const todoStore = JSON.stringify(arr);
    localStorage.setItem('todoStore', todoStore);
  }

  updateUsers(arr: User[]) {
    const usersStore = JSON.stringify(arr);
    localStorage.setItem('users', usersStore);
  }

  ngOnInit(): void {
    const todosStorage = JSON.parse(localStorage.getItem('todoStore'));
    if (todosStorage !== null) {
      this.toDosSubject.next(todosStorage);
    }
    this.toDos$.subscribe(todos => console.log(todos));
  }
}
