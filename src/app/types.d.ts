export interface Todo {
  uniqueId: string;
  id: number;
  title: string;
  todoText: string;
  complete: boolean;
  creationDate: Date;
  doneDate: Date;
  deadline: Date;
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
  doneDate: Date;

  uniqueId: string;
  idNumber: number;
}

export interface DailyToDosEntries {
  target: DailyToDoEntries;
  part: DailyToDoEntries;
  longBox: DailyToDoEntries;
  personalGrowth: DailyToDoEntries;
}

export interface DailyToDoEntries {
  meaning: string;
  title: string;
  icon: string;
  todoTextPlaceholder: string;
}

export interface EditDialogData {
  title: string;
  text: string;
}
