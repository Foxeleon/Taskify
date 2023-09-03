import { Component, Input } from '@angular/core';
import { DailyToDo, DailyToDosEntries } from '../../types';
import { FormBuilder } from '@angular/forms';
import { WeeklyTodoService } from '../../services/weekly-todo.service';
import { map, Observable, shareReplay } from 'rxjs';
import { selectDailyToDosEntries } from '../../store/weekly-to-do/weekly-to-do.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UtilsService } from '../../services/utils.service';
import { dailyToDosEntries } from '../../constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weekly-to-dos-list',
  templateUrl: './weekly-to-dos-list.component.html',
  styleUrls: ['./weekly-to-dos-list.component.css']
})
export class WeeklyToDosListComponent {

  constructor( private fb: FormBuilder,
               private weeklyTodoService: WeeklyTodoService,
               private store: Store<AppState>,
               private breakpointObserver: BreakpointObserver,
               private utilsService: UtilsService,
               private translateService: TranslateService) {}

  dailyToDosEntriesConst: DailyToDosEntries;
  dailyToDosEntries: DailyToDosEntries;
  dailyToDosEntries$: Observable<DailyToDosEntries>;
  dailyToDos$: Observable<DailyToDo[]>;
  @Input() isDoneList: boolean;
  isHandset$: Observable<boolean>;

  ngOnInit(): void {
    this.dailyToDosEntriesConst = dailyToDosEntries;
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches), shareReplay());
    this.dailyToDosEntries$ = this.store.select(selectDailyToDosEntries);
    this.dailyToDos$ = this.weeklyTodoService.dailyToDos$.pipe(map((dailyTodoArr) =>
      (this.isDoneList) ? dailyTodoArr.filter(dailyToDo => dailyToDo.complete)
          .sort((dailyToDoOne, dailyToDoTwo) => (dailyToDoTwo.doneDate.getTime() - dailyToDoOne.doneDate.getTime())) :
        dailyTodoArr.filter(dailyToDo => !dailyToDo.complete)
          .sort((dailyToDoOne, dailyToDoTwo) => (dailyToDoOne.doneDate.getTime() - dailyToDoTwo.doneDate.getTime()))
    ));
    this.dailyToDosEntries$.subscribe(dailyToDosEntriesValue => this.dailyToDosEntries = dailyToDosEntriesValue);
  }

  getTitle(translationString: string, meaning: string): string {
    let title: string;
    this.isHandset$.pipe(map(isHandset => isHandset)).subscribe(isHandset => {
      switch (meaning) {
        case 'Target':
          title = !isHandset ? this.translateService.instant(translationString) : translationString === this.dailyToDosEntriesConst.target.title ? '' : translationString;
          break;
        case 'Part':
          title = !isHandset ? this.translateService.instant(translationString) : translationString === this.dailyToDosEntriesConst.part.title ? '' : translationString;
          break;
        case 'LongBox':
          title = !isHandset ? this.translateService.instant(translationString) : translationString === this.dailyToDosEntriesConst.longBox.title ? '' : translationString;
          break;
        case 'PersonalGrowth':
          title = !isHandset ? this.translateService.instant(translationString) : translationString === this.dailyToDosEntriesConst.personalGrowth.title ? '' : translationString;
          break;
        default:
          title = !isHandset ? this.translateService.instant(translationString) : '';
      }
    });
    return title;
  }

  deleteDailyTodo(uniqueId: string) {
    this.weeklyTodoService.deleteDailyTodo(uniqueId);
  }

  editDailyTodo(uniqueId: string, meaning: string) {
    this.weeklyTodoService.editWeeklyTodo(uniqueId, meaning);
  }

  copyText = async (text: string) => {
    await this.utilsService.copyText(text);
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
    if (!!meaning) {
      this.utilsService.openSnackBar('Annotations.TodoCompleted', ['check'], 'green');
    } else {
      this.utilsService.openSnackBar('Annotations.DailyTodoCompleted', ['check'], 'green');
    }
    this.weeklyTodoService.updateWeeklyTodos(updatedWeeklyTodosArray);
  }
}
