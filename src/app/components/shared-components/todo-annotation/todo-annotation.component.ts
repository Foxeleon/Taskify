import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-annotation',
  templateUrl: './todo-annotation.component.html',
  styles: [`
    :host {
      display: flex;
      align-items: center;
      background-color: white;
    }
  `,
  ]
})
export class TodoAnnotationComponent implements OnInit {
  message$: Observable<string>;
  data: any;
  constructor(private translateService: TranslateService, public snackBarRef: MatSnackBarRef<TodoAnnotationComponent>) {}
  ngOnInit(): void {
    this.message$ = this.translateService.get('setWeeklyTodoAnnotation');
    this.data = this.snackBarRef.data;
  }
}
