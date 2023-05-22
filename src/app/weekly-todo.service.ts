import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTodoService extends TodoService {

  weeklyTodo: any;

  constructor(private httpWeekly: HttpClient) {
    super(httpWeekly);
  }
  init() {
  }
}
