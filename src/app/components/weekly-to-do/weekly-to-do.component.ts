import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeeklyTodoService } from './weekly-todo.service';
import { DailyToDo, DailyToDoEntries, DailyToDosEntries } from '../../types';
import { map, Observable, shareReplay, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectDailyToDosEntries, selectDoneDate } from '../../store/weekly-to-do.selector';
import { WeeklyTodoActions } from '../../store/weekly-to-do.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weekly-to-do',
  templateUrl: './weekly-to-do.component.html',
  styleUrls: ['./weekly-to-do.component.css']
})
export class WeeklyToDoComponent implements OnInit {

  panelOpenState = true;
  weeklyTodoForm: FormGroup;
  singleTodoForm: FormGroup;

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

  // Observables for different cases in the future ideas implementations
  // dailyToDosUncompleted$: Observable<DailyToDo[]>;
  // dailyToDosPartlyCompleted$: Observable<DailyToDo[]>;
  // dailyToDosFullyCompleted$: Observable<DailyToDo[]>;

  constructor( private fb: FormBuilder,
               private weeklyTodoService: WeeklyTodoService,
               private store: Store<AppState>,
               private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches), shareReplay());
    this.dailyToDosEntries$ = this.store.select(selectDailyToDosEntries);
    this.dailyToDosEntries$.subscribe(dailyToDosEntries => {
      this.dailyToDosEntries = dailyToDosEntries;
      this.dailyToDosEntriesArr = Object.values(this.dailyToDosEntries);
    });
    // update weeklyTodos from localStorage
    this.weeklyTodoService.getWeeklyTodosLocalStorage();

    this.dailyToDos$ = this.weeklyTodoService.dailyToDos$;
    this.dailyToDos$.subscribe(dailyToDos => console.log(dailyToDos));

    // this.dailyToDosUncompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo => !dailyTodo.complete)));
    // this.dailyToDosPartlyCompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo =>
           // tslint:disable-next-line:max-line-length
    //     (dailyTodo.complete && (dailyTodo.completePart || dailyTodo.completeTarget || dailyTodo.completeLongBox || dailyTodo.completePersonalGrowth) && (!dailyTodo.completePart || !dailyTodo.completeTarget || !dailyTodo.completeLongBox || !dailyTodo.completePersonalGrowth))))
    // );
    // this.dailyToDosFullyCompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo =>
    //     (dailyTodo.complete && (dailyTodo.completePart && dailyTodo.completeTarget && dailyTodo.completeLongBox && dailyTodo.completePersonalGrowth))))
    // );

    // TODO translate titles somehow using TranslateService

    this.weeklyTodoForm = this.fb.group({
      titleTarget: this.dailyToDosEntries.target.title,
      todoTextTarget: ['', [Validators.required, Validators.maxLength(75)] ],

      titlePart: this.dailyToDosEntries.part.title,
      todoTextPart: ['', [Validators.required, Validators.maxLength(75)] ],

      titleLongBox: this.dailyToDosEntries.longBox.title,
      todoTextLongBox: ['', [Validators.required, Validators.maxLength(75)] ],

      titlePersonalGrowth: this.dailyToDosEntries.personalGrowth.title,
      todoTextPersonalGrowth: ['', [Validators.required, Validators.maxLength(75)] ],
    });

    this.singleTodoForm = this.fb.group({
    });

    this.dailyToDos$.subscribe(dailyTodos => {
      this.weeklyTodoService.updateWeeklyTodosLocalStorage(dailyTodos);
    });
    this.store.select(selectDoneDate).subscribe(value => console.log(value));
  }

  private getDate = (): string => this.weeklyTodoService.yyyymmdd(this.weeklyTodoService.currDay);

  private getDoneDate = (): Date => {
    let dDate: Date;
    this.store.select(selectDoneDate).pipe(take(1)).subscribe((doneDate) => dDate = doneDate);
    return dDate;
  }

  private setDoneDate = (): Date => {
    let dDate: Date;
    this.store.select(selectDoneDate).pipe(take(1)).subscribe(doneDate => {
      // (milliseconds of given date + 24h*60minutes*60seconds*10^3=86400000) = next day
      dDate = new Date(doneDate.getTime() + 86400000);
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

      titleTarget: this.weeklyTodoForm.value.titleTarget,
      titleLongBox: this.weeklyTodoForm.value.titleLongBox,
      completeTarget: false,

      titlePart: this.weeklyTodoForm.value.titlePart,
      titlePersonalGrowth: this.weeklyTodoForm.value.titlePersonalGrowth,
      completePart: false,

      todoTextLongBox: this.weeklyTodoForm.value.todoTextLongBox,
      todoTextPart: this.weeklyTodoForm.value.todoTextPart,
      completeLongBox: false,

      todoTextPersonalGrowth: this.weeklyTodoForm.value.todoTextPersonalGrowth,
      todoTextTarget: this.weeklyTodoForm.value.todoTextTarget,
      completePersonalGrowth: false,

      complete: false,
      creationDate: this.getDate(),
      doneDate: this.getDoneDate(),
    };
    const currentDailyTodos = this.weeklyTodoService.getWeeklyTodos();
    currentDailyTodos.push(newDailyTodo);
    this.weeklyTodoService.updateWeeklyTodos(currentDailyTodos);
    this.resetForm();
  }
}
