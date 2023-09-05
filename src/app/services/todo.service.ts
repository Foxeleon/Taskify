import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, User } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { WarningDialogComponent } from '../components/shared-components/warning-dialog/warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { initTodos } from '../constants';
import { UtilsService } from './utils.service';
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

  todoId: number;
  todo: Todo;
  toDosSubject = new BehaviorSubject<Todo[]>([]);
  toDos$: Observable<Todo[]> = this.toDosSubject.asObservable();

  constructor( private http: HttpClient, public matDialog: MatDialog, private store: Store<AppState>, private utilsService: UtilsService) { }

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
          return { ...todo, complete: true, doneDate: new Date() };
      }
      return todo;
    });
    this.updateTodoStore(updatedTodosArray);
    this.utilsService.openSnackBar('Annotations.TodoCompleted', ['check'], 'green');
  }

  deleteTodo(uniqueId: string) {
    const dialogRef = this.openWarningDialog('WarningMessages.DeleteDailyTodoTitle');

    dialogRef.afterClosed().subscribe(deleteTodo => {
      if (deleteTodo) {
        const patchedWeeklyTodosArray = this.getTodos().filter(todo => todo.uniqueId !== uniqueId);
        this.updateTodoStore(patchedWeeklyTodosArray);
        this.utilsService.openSnackBar('Annotations.deleteTodo', ['trash', 'alternate', 'outline'], 'red');
      }
    });
  }

  openWarningDialog(titleMessage: string) {
    return this.matDialog.open(WarningDialogComponent, {
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

  deleteAllTodos() {
    this.updateTodoStore(this.getTodos().filter(todo => todo.complete));
  }

  completeAllTodos() {
    const allTodosCompleted = this.getTodos().map(todo => {
      if (!todo.complete) {
        todo.complete = true;
        todo.doneDate = new Date();
      }
      return todo;
    });
    this.updateTodoStore(allTodosCompleted);
  }

  setUniqueId(): string {
    const currentTime = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 13));
    return (currentTime + randomNumber).toString(36);
  }

  setId() {
    return this.todoId++;
  }

  setTodo(title: string, todoText: string, deadline: Date): void {
    const todo: Todo = {
      uniqueId: this.setUniqueId(),
      id: this.setId(),
      title,
      todoText,
      complete: false,
      creationDate: new Date(),
      doneDate: undefined,
      deadline
    };
    const currentTodos: Todo[] = this.toDosSubject.getValue();
    const todos: Todo[] = currentTodos.concat(todo);
    this.updateTodoStore(todos);
    const todoId = JSON.stringify(this.todoId);
    localStorage.setItem('todoId', todoId);
    this.utilsService.openSnackBar('Annotations.setWeeklyTodo', ['edit', 'outline'], 'green');
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
    (todosStorage !== null) ? this.updateTodos(todosStorage, true) : this.updateTodos(initTodos, false);
  }

  updateTodos(toDoArr: Todo[], fromServer: boolean) {
    if (fromServer) {
      this.toDosSubject.next(toDoArr.map(todo => {
        todo.deadline = new Date(todo.deadline);
        todo.doneDate = todo.doneDate ? new Date(todo.doneDate) : undefined;
        todo.creationDate = new Date(todo.creationDate);

        // TODO this is migration, refactor after that
        if (todo.uniqueId === undefined) todo.uniqueId = this.setUniqueId();
        if (todo.complete === true && todo.doneDate === undefined) {
          const today = new Date();
          today.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), 0);
          todo.doneDate = today;
        }

        return todo;
      }));
    } else {
      this.toDosSubject.next(toDoArr);
    }
  }

  ngOnInit(): void {
    this.toDos$.subscribe(todos => console.log(todos));
  }
}
