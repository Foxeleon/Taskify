import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODOLIST_FEATURE_KEY, TodolistState } from './todolist.state';

const selectHomeState = createFeatureSelector<TodolistState>(TODOLIST_FEATURE_KEY);

export const selectTodos = createSelector(
  selectHomeState,
  state => state.toDos
);
