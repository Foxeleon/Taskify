import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../../types';
import { WeeklyTodoService } from '../../weekly-to-do/weekly-todo.service';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-buttons-complete-delete-all',
  templateUrl: './buttons-complete-delete-all.component.html',
  styleUrls: ['./buttons-complete-delete-all.component.css']
})
export class ButtonsCompleteDeleteAllComponent implements OnInit {
  // TODO convert todos to observable and use toDos$ for both cases, weekly nad usually todos -> get async update of buttons
  @Input() data: {isWeekly: boolean, toDos?: Todo[]};
  toDosArrLength: number;

  constructor(private weeklyTodoService: WeeklyTodoService, private todoService: TodoService) {}

  ngOnInit(): void {
    this.toDosArrLength = this.data.isWeekly ? this.weeklyTodoService.getWeeklyTodos().length : this.data.toDos.length;
  }

  completeAll() {
    (this.data.isWeekly) ? this.weeklyTodoService.completeAllWeeklyTodos() : this.todoService.completeAll(this.data.toDos);
  }

  clearToDoList() {
    const dialogRef = this.todoService.openDeleteDialog('DeleteAllWeeklyTodosTitle');

    dialogRef.afterClosed().subscribe(deleteAllWeeklyTodos => {
      if (deleteAllWeeklyTodos) {
        (this.data.isWeekly) ? this.weeklyTodoService.deleteAllUncompletedWeeklyTodos() : this.todoService.clearToDoList(this.data.toDos);
      }
    });
  }

}
