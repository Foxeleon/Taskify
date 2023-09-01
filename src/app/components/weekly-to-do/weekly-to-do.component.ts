import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeeklyTodoService } from './weekly-todo.service';
import { DailyToDo, DailyToDoEntries, DailyToDosEntries } from '../../types';
import { map, Observable, shareReplay, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  selectDailyToDosEntries,
  selectDoneDate,
  selectFirstTodoIsToday,
  selectIsMobilePlatform
} from '../../store/weekly-to-do/weekly-to-do.selector';
import { WeeklyTodoActions } from '../../store/weekly-to-do/weekly-to-do.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-weekly-to-do',
  templateUrl: './weekly-to-do.component.html',
  styleUrls: ['./weekly-to-do.component.css']
})
export class WeeklyToDoComponent implements OnInit {

  panelOpenState = true;
  weeklyTodoForm: FormGroup;

  todoTextArea = {
    target: true,
    part: true,
    longBox: true,
    personalGrowth: true
  };
  todoTextIconClass = {
    target: {
      right: this.todoTextArea.target,
      down: !this.todoTextArea.target,
      yellow: !this.todoTextArea.target,
      triangle: true,
      icon: true,
      ui: true
    },
    part: {
      right: this.todoTextArea.part,
      down: !this.todoTextArea.part,
      yellow: !this.todoTextArea.part,
      triangle: true,
      icon: true,
      ui: true
    },
    longbox: {
      right: this.todoTextArea.longBox,
      down: !this.todoTextArea.longBox,
      yellow: !this.todoTextArea.longBox,
      triangle: true,
      icon: true,
      ui: true
    },
    personalgrowth: {
      right: this.todoTextArea.personalGrowth,
      down: !this.todoTextArea.personalGrowth,
      yellow: !this.todoTextArea.personalGrowth,
      triangle: true,
      icon: true,
      ui: true
    },
  };

  // TODO refactor to get all(or almost all) with observable
  dailyToDosEntries: DailyToDosEntries;
  dailyToDosEntries$: Observable<DailyToDosEntries>;
  dailyToDosEntriesArr: DailyToDoEntries[];
  dailyToDos$: Observable<DailyToDo[]>;

  isHandset$: Observable<boolean>;
  isMobilePlatform$: Observable<boolean>;

  // Observables for different cases in the future ideas implementations
  dailyToDosUncompleted$: Observable<DailyToDo[]>;
  // dailyToDosPartlyCompleted$: Observable<DailyToDo[]>;
  // dailyToDosFullyCompleted$: Observable<DailyToDo[]>;

  constructor( private fb: FormBuilder,
               private weeklyTodoService: WeeklyTodoService,
               private store: Store<AppState>,
               private breakpointObserver: BreakpointObserver,
               private utilsService: UtilsService) {}

  selectFirstTodoIsToday$: Observable<boolean>;

  ngOnInit(): void {
    this.selectFirstTodoIsToday$ = this.store.select(selectFirstTodoIsToday);
    this.isMobilePlatform$ = this.store.select(selectIsMobilePlatform);
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches), shareReplay());
    this.dailyToDosEntries$ = this.store.select(selectDailyToDosEntries);
    this.dailyToDosEntries$.subscribe(dailyToDosEntries => {
      this.dailyToDosEntries = dailyToDosEntries;
      this.dailyToDosEntriesArr = Object.values(this.dailyToDosEntries);
    });
    // update weeklyTodos from localStorage
    this.weeklyTodoService.getWeeklyTodosLocalStorage();

    this.dailyToDos$ = this.weeklyTodoService.dailyToDos$;
    // this.dailyToDos$.subscribe(dailyToDos => console.log(dailyToDos));

    this.dailyToDosUncompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo => !dailyTodo.complete)));
    // this.dailyToDosPartlyCompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo =>
           // tslint:disable-next-line:max-line-length
    //     (dailyTodo.complete && (dailyTodo.completePart || dailyTodo.completeTarget || dailyTodo.completeLongBox || dailyTodo.completePersonalGrowth) && (!dailyTodo.completePart || !dailyTodo.completeTarget || !dailyTodo.completeLongBox || !dailyTodo.completePersonalGrowth))))
    // );
    // this.dailyToDosFullyCompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo =>
    //     (dailyTodo.complete && (dailyTodo.completePart && dailyTodo.completeTarget && dailyTodo.completeLongBox && dailyTodo.completePersonalGrowth))))
    // );

    this.weeklyTodoForm = this.fb.group({
      titleTarget: '',
      todoTextTarget: ['', [Validators.required, Validators.maxLength(150)] ],

      titlePart: '',
      todoTextPart: ['', [Validators.required, Validators.maxLength(150)] ],

      titleLongBox: '',
      todoTextLongBox: ['', [Validators.required, Validators.maxLength(150)] ],

      titlePersonalGrowth: '',
      todoTextPersonalGrowth: ['', [Validators.required, Validators.maxLength(150)] ],
    });

    this.dailyToDos$.subscribe(dailyTodos => {
      this.weeklyTodoService.updateWeeklyTodosLocalStorage(dailyTodos);
    });
    // this.store.select(selectDoneDate).subscribe(value => console.log(value));
  }

  openSnackBar(message: string, iconClasses: string[]) {
    this.utilsService.openSnackBar(message, iconClasses);
  }

  backupWeeklyTodosToFile() {
    this.weeklyTodoService.backupWeeklyTodosToFile();
  }
  restoreWeeklyTodosFromFile(event: any) {
    this.weeklyTodoService.restoreWeeklyTodosFromFile(event);
  }

  setFirstTodoTodayOrTomorrow() {
    this.store.dispatch(WeeklyTodoActions.setFirstTodoTodayOrTomorrow());
  }

  deleteAllTodos() {
    this.weeklyTodoService.deleteAllWeeklyTodos();
  }

  private getDate = (): string => this.weeklyTodoService.yyyymmdd(new Date());

  private getDoneDate = (): Date => {
    let dDate: Date;
    this.store.select(selectDoneDate).pipe(take(1)).subscribe((doneDate) => dDate = doneDate);
    return dDate;
  }

  private setDoneDate = (): Date => {
    let dDate: Date;
    let uncompletedTodosLength;
    let firstTodoIsToday;
    this.dailyToDosUncompleted$.pipe(take(1)).subscribe(dailyTodoArr => uncompletedTodosLength = dailyTodoArr.length);
    this.selectFirstTodoIsToday$.pipe(take(1)).subscribe(isToday => firstTodoIsToday = isToday);
    this.store.select(selectDoneDate).pipe(take(1)).subscribe(doneDate => {
      if (uncompletedTodosLength === 0) {
        if (firstTodoIsToday) {
          dDate = new Date();
        } else {
          dDate = new Date(new Date().getTime() + 86400000);
        }
      } else {
        // (milliseconds of given date + 24h*60minutes*60seconds*10^3=86400000) = next day
        dDate = new Date(doneDate.getTime() + 86400000);
      }
    });
    return dDate;
  }

  getTextAreaState(meaning: string): boolean {
    switch (meaning) {
      case this.dailyToDosEntries.target.meaning:
        return this.todoTextArea.target;
      case this.dailyToDosEntries.part.meaning:
        return this.todoTextArea.part;
      case this.dailyToDosEntries.longBox.meaning:
        return this.todoTextArea.longBox;
      case this.dailyToDosEntries.personalGrowth.meaning:
        return this.todoTextArea.personalGrowth;
    }
  }

  setTodoTextAreaState(meaning: string) {
    switch (meaning) {
      case this.dailyToDosEntries.target.meaning: {
        this.todoTextArea.target = !this.todoTextArea.target;
        this.todoTextIconClass.target.right = this.todoTextArea.target;
        this.todoTextIconClass.target.down = !this.todoTextArea.target;
        this.todoTextIconClass.target.yellow = !this.todoTextArea.target;
      }
                                                  break;
      case this.dailyToDosEntries.part.meaning: {
        this.todoTextArea.part = !this.todoTextArea.part;
        this.todoTextIconClass.part.right = this.todoTextArea.part;
        this.todoTextIconClass.part.down = !this.todoTextArea.part;
        this.todoTextIconClass.part.yellow = !this.todoTextArea.part;
      }
                                                break;
      case this.dailyToDosEntries.longBox.meaning: {
        this.todoTextArea.longBox = !this.todoTextArea.longBox;
        this.todoTextIconClass.longbox.right = this.todoTextArea.longBox;
        this.todoTextIconClass.longbox.down = !this.todoTextArea.longBox;
        this.todoTextIconClass.longbox.yellow = !this.todoTextArea.longBox;
      }
                                                   break;
      case this.dailyToDosEntries.personalGrowth.meaning: {
        this.todoTextArea.personalGrowth = !this.todoTextArea.personalGrowth;
        this.todoTextIconClass.personalgrowth.right = this.todoTextArea.personalGrowth;
        this.todoTextIconClass.personalgrowth.down = !this.todoTextArea.personalGrowth;
        this.todoTextIconClass.personalgrowth.yellow = !this.todoTextArea.personalGrowth;
      }
                                                          break;
    }
  }

  resetForm() {
    this.weeklyTodoForm.patchValue({
      todoTextTarget: '',
      todoTextPart: '',
      todoTextLongBox: '',
      todoTextPersonalGrowth: '',
    });
  }

  setTodo(): void {
    this.store.dispatch(WeeklyTodoActions.setDoneDate({doneDate: this.setDoneDate()}));
    const newDailyTodo = this.weeklyTodoService.dailyTodo = {
      uniqueId: this.weeklyTodoService.setUniqueId(),
      idNumber: this.weeklyTodoService.setIdNumber(),

      titleTarget: (this.weeklyTodoForm.value.titleTarget === '') ? this.dailyToDosEntries.target.title : this.weeklyTodoForm.value.titleTarget,
      todoTextTarget: this.weeklyTodoForm.value.todoTextTarget,
      completeTarget: false,

      titlePart: (this.weeklyTodoForm.value.titlePart === '') ? this.dailyToDosEntries.part.title : this.weeklyTodoForm.value.titlePart,
      todoTextPart: this.weeklyTodoForm.value.todoTextPart,
      completePart: false,

      titleLongBox: (this.weeklyTodoForm.value.titleLongBox === '') ? this.dailyToDosEntries.longBox.title : this.weeklyTodoForm.value.titleLongBox,
      todoTextLongBox: this.weeklyTodoForm.value.todoTextLongBox,
      completeLongBox: false,

      titlePersonalGrowth: (this.weeklyTodoForm.value.titlePersonalGrowth === '') ? this.dailyToDosEntries.personalGrowth.title : this.weeklyTodoForm.value.titlePersonalGrowth,
      todoTextPersonalGrowth: this.weeklyTodoForm.value.todoTextPersonalGrowth,
      completePersonalGrowth: false,

      complete: false,
      creationDate: this.getDate(),
      doneDate: this.getDoneDate(),
    };
    const currentDailyTodos = this.weeklyTodoService.getWeeklyTodos();
    currentDailyTodos.push(newDailyTodo);
    this.weeklyTodoService.updateWeeklyTodos(currentDailyTodos);
    this.openSnackBar('setWeeklyTodoAnnotation', ['edit', 'outline', 'green']);
    this.resetForm();
  }
}
