import { createReducer, on } from '@ngrx/store';
import { TodolistActions } from './todolist.actions';
import { TodolistState } from './todolist.state';
import { initTodos } from '../../constants';


export const initialState: TodolistState = {
  toDos: initTodos
};

export const todolistReducer = createReducer(
  initialState,
  on(TodolistActions.setTodos, (state, {toDos}) => ({...state, toDos})),
  on(TodolistActions.addTodo, (state, { toDo }) => ({...state.toDos.unshift(toDo)})),
  // on(TodolistActions.updateTodo, (state, {toDo}) => ({...state, toDos})),
);
