import { Todo } from '../../types';
import { EntityState } from '@ngrx/entity';

export const TODOLIST_FEATURE_KEY = 'Todolist';

export interface TodolistState extends EntityState<MyEntity> {
  toDos: Todo[];
}
