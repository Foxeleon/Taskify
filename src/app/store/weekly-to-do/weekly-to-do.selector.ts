import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEEKLY_TODO_FEATURE_KEY, WeeklyTodoState } from './weekly-to-do.state';

const selectWeeklyToDo = createFeatureSelector<WeeklyTodoState>(WEEKLY_TODO_FEATURE_KEY);

export const selectDailyToDosEntries = createSelector(
  selectWeeklyToDo,
  state => state.dailyToDosEntries
);

export const selectDoneDate = createSelector(
  selectWeeklyToDo,
  state => state.dates.doneDate
);

export const selectFirstTodoIsToday = createSelector(
  selectWeeklyToDo,
  state => state.dates.firstDoneDateToday
);

export const selectIsMobilePlatform = createSelector(
  selectWeeklyToDo,
  state => state.isMobilePlatform
);
