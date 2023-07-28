import { createReducer, on } from '@ngrx/store';
import { WeeklyTodoState } from './weekly-to-do.state';
import { WeeklyTodoActions } from './weekly-to-do.actions';

export const initialState: WeeklyTodoState = {
  dailyToDosEntries: {
    target: {
      meaning: 'Target',
      title: 'dailyToDosEntries.target-title',
      icon: 'crosshairs',
      todoTextPlaceholder: 'dailyToDosEntries.target-todoTextPlaceholder'
    },
    part: {
      meaning: 'Part',
      title: 'dailyToDosEntries.part-title',
      icon: 'tasks',
      todoTextPlaceholder: 'dailyToDosEntries.part-todoTextPlaceholder'
    },
    longBox: {
      meaning: 'LongBox',
      title: 'dailyToDosEntries.longBox-title',
      icon: 'clock',
      todoTextPlaceholder: 'dailyToDosEntries.longBox-todoTextPlaceholder'
    },
    personalGrowth: {
      meaning: 'PersonalGrowth',
      title: 'dailyToDosEntries.personalGrowth-title',
      icon: 'chess king',
      todoTextPlaceholder: 'dailyToDosEntries.personalGrowth-todoTextPlaceholder'
    }
  },
  dates: {
    doneDate: new Date(),
    firstDoneDateToday: false
  },
};

export const weeklyTodoReducer = createReducer(
  initialState,
  on(WeeklyTodoActions.setDailyToDosEntries, (state, {dailyToDosEntries}) => ({...state, dailyToDosEntries})),
  on(WeeklyTodoActions.setDoneDate, (state, {doneDate}) => ({...state, dates: {firstDoneDateToday: state.dates.firstDoneDateToday, doneDate}})),
  on(WeeklyTodoActions.setFirstTodoTodayOrTomorrow, (state) => ({...state, dates: {firstDoneDateToday: !state.dates.firstDoneDateToday, doneDate: state.dates.doneDate}})),
);
