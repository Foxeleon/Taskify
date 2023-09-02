import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../../types';
import { WeeklyTodoService } from '../../../services/weekly-todo.service';
import { TodoService } from '../../../services/todo.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-buttons-complete-delete-all',
  templateUrl: './buttons-complete-delete-all.component.html',
  styleUrls: ['./buttons-complete-delete-all.component.css']
})
export class ButtonsCompleteDeleteAllComponent implements OnInit {
  // TODO convert todos to observable and use toDos$ for both cases, weekly nad usually todos -> get async update of buttons
  @Input() data: {isWeekly: boolean, toDos?: Todo[]};
  toDosArrLength: number;

  constructor(private weeklyTodoService: WeeklyTodoService, private todoService: TodoService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.toDosArrLength = this.data.isWeekly ? this.weeklyTodoService.getWeeklyTodos().length : this.data.toDos.length;
  }

  completeAll() {
    const dialogRef = this.todoService.openWarningDialog('CompleteTodosList');

    dialogRef.afterClosed().subscribe(deleteAllWeeklyTodos => {
      if (deleteAllWeeklyTodos) {
        (this.data.isWeekly) ? this.weeklyTodoService.completeAllWeeklyTodos() : this.todoService.completeAll(this.data.toDos);
        this.utilsService.openSnackBar('Annotations.AllTodosCompleted', ['flag checkered'], 'green', 3000);
      }
    });
  }

  clearToDoList() {
    const dialogRef = this.todoService.openWarningDialog('ClearTodosUncompletedList');

    dialogRef.afterClosed().subscribe(deleteAllWeeklyTodos => {
      if (deleteAllWeeklyTodos) {
        (this.data.isWeekly) ? this.weeklyTodoService.deleteAllUncompletedWeeklyTodos() : this.todoService.clearToDoList(this.data.toDos);
        this.utilsService.openSnackBar('Annotations.deleteAllDailyTodos', ['trash', 'alternate'], 'red', 3000);
      }
    });
  }

}
