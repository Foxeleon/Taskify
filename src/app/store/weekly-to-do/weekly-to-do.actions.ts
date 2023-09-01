import { createAction, props } from '@ngrx/store';
import { DailyToDosEntries } from '../../types';

export class WeeklyTodoActions {
  static readonly setDailyToDosEntries = createAction('[WeeklyTodo] set dailyToDosEntries', props<{dailyToDosEntries: DailyToDosEntries}>());
  static readonly setDoneDate = createAction('[WeeklyTodo] set done date', props<{doneDate: Date}>());
  static readonly setFirstTodoTodayOrTomorrow = createAction('[WeeklyTodo] change first todo date in the list');
}
