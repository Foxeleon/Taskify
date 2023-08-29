import { createReducer, on } from '@ngrx/store';
import { WeeklyTodoState } from './weekly-to-do.state';
import { WeeklyTodoActions } from './weekly-to-do.actions';
import { Capacitor } from '@capacitor/core';
import { dailyToDosEntries } from '../constants';

export const initialState: WeeklyTodoState = {
  dailyToDosEntries,
  dates: {
    doneDate: new Date(),
    firstDoneDateToday: false
  },
  isMobilePlatform: Capacitor.getPlatform() !== 'web'
};

export const weeklyTodoReducer = createReducer(
  initialState,
  // tslint:disable-next-line:no-shadowed-variable
  on(WeeklyTodoActions.setDailyToDosEntries, (state, {dailyToDosEntries}) => ({...state, dailyToDosEntries})),
  on(WeeklyTodoActions.setDoneDate, (state, {doneDate}) => ({...state, dates: {firstDoneDateToday: state.dates.firstDoneDateToday, doneDate}})),
  on(WeeklyTodoActions.setFirstTodoTodayOrTomorrow, (state) => ({...state, dates: {firstDoneDateToday: !state.dates.firstDoneDateToday, doneDate: state.dates.doneDate}})),
);
