import { Component, Input, OnInit } from '@angular/core';
import { DailyToDo, Todo } from '../../../types';
import { WeeklyTodoService } from '../../../services/weekly-todo.service';
import { TodoService } from '../../../services/todo.service';
import { UtilsService } from '../../../services/utils.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-buttons-complete-delete-all',
  templateUrl: './buttons-complete-delete-all.component.html',
  styleUrls: ['./buttons-complete-delete-all.component.css']
})
export class ButtonsCompleteDeleteAllComponent implements OnInit {
  @Input() data: {isWeekly: boolean};
  toDosObservable$: Observable<Todo[] | DailyToDo[]>;
  toDosUnCompletedObservable$: Observable<Todo[] | DailyToDo[]>;

  constructor(private weeklyTodoService: WeeklyTodoService, private todoService: TodoService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.toDosObservable$ = this.data.isWeekly ? this.weeklyTodoService.dailyToDos$ : this.todoService.getTodosObservable();

    // TODO do settings feature for todos and add delete all todos button there
    // only for filter
    this.toDosUnCompletedObservable$ = this.toDosObservable$.pipe(map(todos => this.filterTodosBy(todos)));
  }

  // TODO change type to DailyToDo[] after refactoring of DailyToDo interface
  filterTodosBy(todos: Array<any>): Array<any> {
    return todos.filter(todo => !todo.complete);
  }

  completeAll() {
    const dialogRef = this.todoService.openWarningDialog('WarningMessages.CompleteTodosList');

    dialogRef.afterClosed().subscribe(deleteAllWeeklyTodos => {
      if (deleteAllWeeklyTodos) {
        (this.data.isWeekly) ? this.weeklyTodoService.completeAllWeeklyTodos() : this.todoService.completeAllTodos();
        this.utilsService.openSnackBar('Annotations.AllTodosCompleted', ['flag checkered'], 'green', 3000);
      }
    });
  }

  clearToDoList() {
    const dialogRef = this.todoService.openWarningDialog('WarningMessages.ClearTodosUncompletedList');

    dialogRef.afterClosed().subscribe(deleteAllWeeklyTodos => {
      if (deleteAllWeeklyTodos) {
        (this.data.isWeekly) ? this.weeklyTodoService.deleteAllUncompletedWeeklyTodos() : this.todoService.deleteAllTodos();
        this.utilsService.openSnackBar('Annotations.deleteAllDailyTodos', ['trash', 'alternate'], 'red', 3000);
      }
    });
  }

}
