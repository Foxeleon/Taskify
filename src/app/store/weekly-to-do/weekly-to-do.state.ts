import { DailyToDosEntries } from '../../types';

export const WEEKLY_TODO_FEATURE_KEY = 'WeeklyTodo';

export interface WeeklyTodoState {
  dailyToDosEntries: DailyToDosEntries;
  dates: {
    doneDate: Date;
    firstDoneDateToday: boolean;
  };
  isMobilePlatform: boolean;
}
