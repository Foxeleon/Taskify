import { createAction, props } from '@ngrx/store';
import { DailyToDo, DailyToDosEntries } from '../types';

export class WeeklyTodoActions {
  static readonly setDailyToDosEntries = createAction('[WeeklyTodo] set dailyToDosEntries', props<{dailyToDosEntries: DailyToDosEntries}>());
  static readonly setDailyToDos = createAction('[WeeklyTodo] set dailyToDosEntries', props<{dailyToDos: DailyToDo[]}>());
  static readonly setDailyToDosLastId = createAction('[WeeklyTodo] set dailyToDosEntries', props<{dailyToDosLastId: number}>());
}
