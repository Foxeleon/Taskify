import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DailyToDo, Todo, User } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteWarningDialogComponent } from '../components/delete-warning-dialog/delete-warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { initTodos } from '../constants';

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

  getTodosObservable(): Observable<Todo[]> {
    return this.toDos$;
  }

  getTodos(): Todo[] {
    return this.toDosSubject.getValue();
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.users) as Observable<User[]>;
  }

  setUserId() {
    return this.userId = Date.now().toString(36);
  }

  yyyymmdd(date: Date): string {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [date.getFullYear() + ('-'),
            (mm > 9 ? '' : '0') + mm + ('-'),
            (dd > 9 ? '' : '0') + dd
           ].join('');
  }

  completeTodo(uniqueId: string) {
    const todosArray = this.getTodos();
    let updatedTodosArray: Todo[];
    updatedTodosArray = todosArray.map(todo => {
      if (todo.uniqueId === uniqueId) {
          return { ...todo, complete: true };
      }
      return todo;
    });
    this.updateTodoStore(updatedTodosArray);
  }

  deleteTodo(uniqueId: string) {
    const dialogRef = this.openDeleteDialog('DeleteDailyTodoTitle');

    dialogRef.afterClosed().subscribe(deleteTodo => {
      if (deleteTodo) {
        const patchedWeeklyTodosArray = this.getTodos().filter(todo => todo.uniqueId !== uniqueId);
        this.updateTodoStore(patchedWeeklyTodosArray);
      }
    });
  }

  openDeleteDialog(titleMessage: string) {
    return this.matDialog.open(DeleteWarningDialogComponent, {
      width: '350px',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '150ms',
      data: { titleMessageData: titleMessage },
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

  setId() {
    return this.todoId++;
  }

  setTodo(title: string, todoText: string, deadline: string): void {
    const todo: Todo = {
      uniqueId: this.setUniqueId(),
      id: this.setId(),
      title,
      todoText,
      complete: false,
      creationDate: this.yyyymmdd(this.currDay),
      doneDate: '',
      deadline
    };
    const currentTodos: Todo[] = this.toDosSubject.getValue();
    const todos: Todo[] = currentTodos.concat(todo);
    this.updateTodoStore(todos);
    const todoId = JSON.stringify(this.todoId);
    localStorage.setItem('todoId', todoId);
  }

  updateTodoStore(arr: Todo[]) {
    this.toDosSubject.next(arr);
    localStorage.setItem('todoStore', JSON.stringify(this.getTodos()));
  }

  updateUsers(arr: User[]) {
    const usersStore = JSON.stringify(arr);
    localStorage.setItem('users', usersStore);
  }

  initTodos() {
    const todosStorage = JSON.parse(localStorage.getItem('todoStore'));
    (todosStorage !== null) ?
      this.updateTodos(JSON.parse(localStorage.getItem('todoStore')), true) :
      this.updateTodos(initTodos, false);
  }

  updateTodos(toDoArr: Todo[], fromServer: boolean) {
    this.toDosSubject.next(toDoArr.map(todo => {
      if (fromServer) {
        // TODO this is migration, delete after january 2024
        if (todo.uniqueId === null) todo.uniqueId = this.setUniqueId();
      }
      return todo;
    }));
  }

  ngOnInit(): void {
    this.toDos$.subscribe(todos => console.log(todos));
  }
}
