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
  creationDate: string;
  doneDate: DoneDate;

  uniqueId: string;
  idNumber: number;
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

export interface DoneDate {
  date: Date;
  dateString: string;
}
