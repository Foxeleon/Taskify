import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData, TodoFilterStates } from '../../types';
import { TranslateService } from '@ngx-translate/core';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { todoFilterStates } from '../../constants';

@Component({
  selector: 'app-todos-settings-dialog',
  templateUrl: './todos-settings-dialog.component.html',
  styles: [
  ]
})
export class TodosSettingsDialogComponent implements OnInit {

  todoFilterBy$: Observable<string>;
  todoFilterStates: TodoFilterStates = todoFilterStates;

  constructor(
    public dialogRef: MatDialogRef<TodosSettingsDialogComponent>,
    private todoService: TodoService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.todoFilterBy$ = this.todoService.todoFilterBy$;
  }

  setTodoFilterState() {
    this.todoService.toggleTodoFilterState();
  }

  close() {}
}
