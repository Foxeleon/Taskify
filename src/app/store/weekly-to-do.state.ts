import { DailyToDosEntries, DoneDate } from '../types';

export const WEEKLY_TODO_FEATURE_KEY = 'WeeklyTodo';

export interface WeeklyTodoState {
  dailyToDosEntries: DailyToDosEntries;
  doneDate: DoneDate;
}
