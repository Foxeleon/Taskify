import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weekly-todo-annotated',
  templateUrl: './weekly-todo-annotated.component.html',
  styles: [`
    :host {
      display: flex;
      align-items: center;
      background-color: white;
    }
  `,
  ]
})
export class WeeklyTodoAnnotatedComponent implements OnInit {
  message$: Observable<string>;
  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {
    this.message$ = this.translateService.get('setWeeklyTodoAnnotation');
  }
}
