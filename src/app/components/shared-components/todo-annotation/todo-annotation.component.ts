import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from '../../../types';

@Component({
  selector: 'app-todo-annotation',
  templateUrl: './todo-annotation.component.html',
  styles: [`
    :host {
      display: flex;
      align-items: center;
      background-color: white;
      width: fit-content;
      border-radius: 10px;
      justify-content: center;
    }
    .todo-snackBar {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
    }
  `,
  ]
})
export class TodoAnnotationComponent implements OnInit {
  message$: Observable<string>;
  iconClasses: string;
  constructor(private translateService: TranslateService, public snackBarRef: MatSnackBarRef<TodoAnnotationComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
  ngOnInit(): void {
    this.message$ = this.translateService.get('setWeeklyTodoAnnotation');
    const iconClasses = this.data.iconClasses;
    iconClasses.push('icon');
    this.iconClasses = iconClasses.join(' ');
    console.log(this.data);
  }
}
