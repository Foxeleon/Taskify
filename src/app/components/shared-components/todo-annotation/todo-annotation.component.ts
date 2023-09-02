import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from '../../../types';

@Component({
  selector: 'app-todo-annotation',
  template: `
    <span class="todo-snackBar" style="{{borderStyle}}" matSnackBarLabel>
      <div style="padding-right: 5px">{{message$ | async}} </div>
      <i class="{{iconClasses}}"></i>
    </span>
  `,
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
      border-radius: 10px;
      box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
    }
  `,
  ]
})
export class TodoAnnotationComponent implements OnInit {
  message$: Observable<string>;
  iconClasses: string;
  borderStyle: string;
  constructor(private translateService: TranslateService, public snackBarRef: MatSnackBarRef<TodoAnnotationComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
  ngOnInit(): void {
    this.message$ = this.translateService.get(this.data.translationMessage);
    this.borderStyle = `border: 1px solid ${this.data.color}`;
    const iconClasses = this.data.iconClasses;
    iconClasses.push('icon', this.data.color);
    this.iconClasses = iconClasses.join(' ');
  }
}
