import { Component, Input } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { DailyToDo, Todo } from '../../types';

@Component({
  selector: 'app-buttons-complete-delete-all',
  templateUrl: './buttons-complete-delete-all.component.html',
  styleUrls: ['./buttons-complete-delete-all.component.css']
})
export class ButtonsCompleteDeleteAllComponent {

  @Input() toDos$: Observable<any | null>;
  // @Input() toDos$: Observable<DailyToDo[] | Todo[]>;
  // isWeekly: boolean = this.toDos$.pipe(map(todosArr => todosArr[0])).subscribe(res => (typeof res === 'DailyToDo'));
}
