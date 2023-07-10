import { Component, Input } from '@angular/core';
import { DailyToDo, DailyToDosEntries } from '../../types';
import { FormBuilder } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { selectDailyToDos, selectDailyToDosEntries } from '../../store/weekly-to-do.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { WeeklyTodoActions } from '../../store/weekly-to-do.actions';

@Component({
  selector: 'app-weekly-to-dos-list',
  templateUrl: './weekly-to-dos-list.component.html',
  styleUrls: ['./weekly-to-dos-list.component.css']
})
export class WeeklyToDosListComponent {

  constructor( private fb: FormBuilder, private store: Store<AppState> ) {}

  dailyToDosEntries: DailyToDosEntries;
  dailyToDosEntries$: Observable<DailyToDosEntries>;
  dailyToDos$: Observable<DailyToDo[]>;
  @Input() siDoneList: boolean;

  ngOnInit(): void {
    this.dailyToDosEntries$ = this.store.select(selectDailyToDosEntries);
    this.dailyToDos$ = this.store.select(selectDailyToDos).pipe(map((dailyTodoArr) => (this.siDoneList) ? dailyTodoArr.filter(dailyTodo => dailyTodo.complete) : dailyTodoArr));
    this.dailyToDosEntries$.subscribe(dailyToDosEntries => this.dailyToDosEntries = dailyToDosEntries);
  }

  completeDailyTodo(uniqueId: string, meaning?: string) {
    let updatedWeeklyTodosArray: DailyToDo[];
    this.store.select(selectDailyToDos).subscribe(weeklyTodosArray => {
      switch (meaning) {
        case this.dailyToDosEntries.target.meaning:
          updatedWeeklyTodosArray = weeklyTodosArray.map(dailyTodo => {
            if (dailyTodo.uniqueId === uniqueId) {
              if (dailyTodo.completePart && dailyTodo.completeLongBox && dailyTodo.completePersonalGrowth) {
                return { ...dailyTodo, complete: true, completeTarget: true };
              }
              return { ...dailyTodo, completeTarget: true };
            }
            return dailyTodo;
          });
          break;
        case this.dailyToDosEntries.part.meaning:
          updatedWeeklyTodosArray = weeklyTodosArray.map(dailyTodo => {
            if (dailyTodo.uniqueId === uniqueId) {
              if (dailyTodo.completeTarget && dailyTodo.completeLongBox && dailyTodo.completePersonalGrowth) {
                return { ...dailyTodo, complete: true, completePart: true };
              }
              return { ...dailyTodo, completePart: true };
            }
            return dailyTodo;
          });
          break;
        case this.dailyToDosEntries.longBox.meaning:
          updatedWeeklyTodosArray = weeklyTodosArray.map(dailyTodo => {
            if (dailyTodo.uniqueId === uniqueId) {
              if (dailyTodo.completeTarget && dailyTodo.completePart && dailyTodo.completePersonalGrowth) {
                return { ...dailyTodo, complete: true, completeLongBox: true };
              }
              return { ...dailyTodo, completeLongBox: true };
            }
            return dailyTodo;
          });
          break;
        case this.dailyToDosEntries.personalGrowth.meaning:
          updatedWeeklyTodosArray = weeklyTodosArray.map(dailyTodo => {
            if (dailyTodo.uniqueId === uniqueId) {
              if (dailyTodo.completeTarget && dailyTodo.completePart && dailyTodo.completeLongBox) {
                return { ...dailyTodo, complete: true, completePersonalGrowth: true };
              }
              return { ...dailyTodo, completePersonalGrowth: true };
            }
            return dailyTodo;
          });
          break;
        default:
          updatedWeeklyTodosArray = weeklyTodosArray.map(dailyTodo => {
            if (dailyTodo.uniqueId === uniqueId) {
              return { ...dailyTodo, complete: !dailyTodo.complete };
            }
            return dailyTodo;
          });
      }
      this.store.dispatch(WeeklyTodoActions.setDailyToDos({dailyToDos: updatedWeeklyTodosArray}));
    });
  }
}
