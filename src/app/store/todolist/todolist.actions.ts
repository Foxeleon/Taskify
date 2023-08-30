import { createAction, props } from '@ngrx/store';
import { Todo } from '../../types';

export class TodolistActions {
  static readonly setTodos = createAction('[Todolist] set Todos', props<{toDos: Todo[]}>());
  static readonly addTodo = createAction('[Todolist] add Todo to Todos', props<{toDo: Todo}>());
  static readonly updateTodo = createAction('[Todolist] update todo of Todos', props<{toDo: Todo}>());
}
