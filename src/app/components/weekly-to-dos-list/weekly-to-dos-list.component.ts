import { Component, Input } from '@angular/core';
import { DailyToDo, DailyToDosEntries } from '../../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeeklyTodoService } from '../weekly-to-do/weekly-todo.service';
import { map, Observable } from 'rxjs';
import { selectDailyToDosEntries } from '../../store/weekly-to-do.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
// import { debounce } from 'lodash';

export interface WeeklyTodoListForm {
  todoTextTarget: string;
  todoTextPart: string;
  todoTextLongBox: string;
  todoTextPersonalGrowth: string;
}

@Component({
  selector: 'app-weekly-to-dos-list',
  templateUrl: './weekly-to-dos-list.component.html',
  styleUrls: ['./weekly-to-dos-list.component.css']
})
export class WeeklyToDosListComponent {

  constructor( private fb: FormBuilder, private weeklyTodoService: WeeklyTodoService, private store: Store<AppState> ) {}

  dailyToDosEntries: DailyToDosEntries;
  dailyToDosEntries$: Observable<DailyToDosEntries>;
  dailyToDos$: Observable<DailyToDo[]>;
  @Input() isDoneList: boolean;
  weeklyTodoListForm: FormGroup;
  // onTodoTextChange = debounce((value: WeeklyTodoListForm) => {
  //   console.log(value);
  // }, 500);

  ngOnInit(): void {
    this.dailyToDosEntries$ = this.store.select(selectDailyToDosEntries);
    this.dailyToDos$ = this.weeklyTodoService.dailyToDos$.pipe(map((dailyTodoArr) =>
      (this.isDoneList) ? dailyTodoArr.filter(dailyToDo => dailyToDo.complete) :
        dailyTodoArr.filter(dailyToDo => (dailyToDo.doneDate.getTime() > new Date().getTime()) && !dailyToDo.complete)
    ));
    this.dailyToDosEntries$.subscribe(dailyToDosEntries => this.dailyToDosEntries = dailyToDosEntries);

    this.weeklyTodoListForm = this.fb.group({
        todoTextTarget: ['', [Validators.required, Validators.maxLength(75)]],
        todoTextPart: ['', [Validators.required, Validators.maxLength(75)]],
        todoTextLongBox: ['', [Validators.required, Validators.maxLength(75)]],
        todoTextPersonalGrowth: ['', [Validators.required, Validators.maxLength(75)]],
    });
    // tslint:disable-next-line:max-line-length
    // this.todoTexts$ = this.weeklyTodoListForm.valueChanges.pipe(map(({todoTextTarget, todoTextPart, todoTextLongBox, todoTextPersonalGrowth}) => {todoTextTarget, todoTextPart, todoTextLongBox, todoTextPersonalGrowth}));
    // tap(value => (this.onTodoTextChange(value)))
    // this.weeklyTodoListForm.valueChanges.subscribe(value => (this.onTodoTextChange(value)));
  }

  completeDailyTodo(uniqueId: string, meaning?: string) {
    const weeklyTodosArray = this.weeklyTodoService.getWeeklyTodos();
    let updatedWeeklyTodosArray: DailyToDo[];

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
    this.weeklyTodoService.updateWeeklyTodos(updatedWeeklyTodosArray);
  }
}
