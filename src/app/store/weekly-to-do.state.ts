import { DailyToDo, DailyToDosEntries } from '../types';

export const WEEKLY_TODO_FEATURE_KEY = 'WeeklyTodo';

export interface WeeklyTodoState {
  dailyToDosEntries: DailyToDosEntries;
  dailyToDos: DailyToDo[];
  dailyToDosLastId: number;
}
