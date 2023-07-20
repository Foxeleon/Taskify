import { createReducer, on } from '@ngrx/store';
import { WeeklyTodoState } from './weekly-to-do.state';
import { WeeklyTodoActions } from './weekly-to-do.actions';

export const initialState: WeeklyTodoState = {
  dailyToDosEntries: {
    target: {
      meaning: 'Target',
      title: 'ЦЕЛЬ',
      icon: 'crosshairs',
      todoTextPlaceholder: 'Главная задача на день'
    },
    part: {
      meaning: 'Part',
      title: 'ЧАСТЬ ЗАДАЧИ',
      icon: 'tasks',
      todoTextPlaceholder: 'Часть длительного дела, которые решается в несколько этапов'
    },
    longBox: {
      meaning: 'LongBox',
      title: 'ДОЛГИЙ ЯЩИК',
      icon: 'clock',
      todoTextPlaceholder: 'Не срочное дело, которое давно надо бы сделать'
    },
    personalGrowth: {
      meaning: 'PersonalGrowth',
      title: 'РОСТ',
      icon: 'chess king',
      todoTextPlaceholder: 'Всё что увеличит ваш "личностный рост" сегодня'
    }
  },
  doneDate: {date: new Date(), dateString: ''},
};

export const weeklyTodoReducer = createReducer(
  initialState,
  on(WeeklyTodoActions.setDailyToDosEntries, (state, {dailyToDosEntries}) => ({...state, dailyToDosEntries})),
  on(WeeklyTodoActions.setDoneDate, (state, {doneDate}) => ({...state, doneDate})),
);
