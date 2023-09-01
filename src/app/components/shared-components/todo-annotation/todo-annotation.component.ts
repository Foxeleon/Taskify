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
      justify-content: center;
      margin: -50px 0px 0px 120px;
    }
    .todo-snackBar {
      display: flex;
      flex-flow: row nowrap;
      align-items: stretch;
      border: 1px solid #21ba45;
      border-radius: 10px;
      box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
    }
  `,
  ]
})
export class TodoAnnotationComponent implements OnInit {
  message$: Observable<string>;
  iconClasses: string;
  constructor(private translateService: TranslateService, public snackBarRef: MatSnackBarRef<TodoAnnotationComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
  ngOnInit(): void {
    this.message$ = this.translateService.get(this.data.translationMessage);
    const iconClasses = this.data.iconClasses;
    iconClasses.push('icon');
    this.iconClasses = iconClasses.join(' ');
  }
}
