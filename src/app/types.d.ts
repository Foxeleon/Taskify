export interface Todo {
  id: number;
  title: string;
  todoText: string;
  complete: boolean;
  creationDate: string;
  doneDate: string;
  deadline: string;
}

export interface User {
  id: string;
  role: string;
  username: string;
  firstName: string;
  lastName: string;
  creationDate: Date;
  email: string;
  password: string;
  lastLoginDate: Date;
}

export interface DailyToDo {
  id: number;
  titleTarget: string;
  todoTextTarget: string;
  titlePart: string;
  todoTextPart: string;
  titleLongBox: string;
  todoTextLongBox: string;
  titlePersonalGrowth: string;
  todoTextPersonalGrowth: string;
  complete: boolean;
  weekDay: string;
  creationDate: string;
  doneDate: string;
}

export interface DailyToDoEntries {
  meaning: string;
  title: string;
  icon: string;
  todoTextPlaceholder: string;
}

export interface DailyToDosEntries {
  target: DailyToDoEntries;
  part: DailyToDoEntries;
  longBox: DailyToDoEntries;
  personalGrowth: DailyToDoEntries;
}
