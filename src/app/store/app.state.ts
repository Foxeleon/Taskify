import { HOME_FEATURE_KEY, HomeState } from './home/home.state';
import { WEEKLY_TODO_FEATURE_KEY, WeeklyTodoState } from './weekly-to-do/weekly-to-do.state';

export interface AppState {
  [HOME_FEATURE_KEY]?: HomeState;
  [WEEKLY_TODO_FEATURE_KEY]?: WeeklyTodoState;
  [TODOLIST_FEATURE_KEY]?: TodolistState;
}
