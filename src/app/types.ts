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
