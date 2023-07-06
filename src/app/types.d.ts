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
  uniqueId: string;
  idNumber: number;

  titleTarget: string;
  todoTextTarget: string;
  completeTarget?: boolean;

  titlePart: string;
  todoTextPart: string;
  completePart?: boolean;

  titleLongBox: string;
  todoTextLongBox: string;
  completeLongBox?: boolean;

  titlePersonalGrowth: string;
  todoTextPersonalGrowth: string;
  completePersonalGrowth?: boolean;

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
