import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeeklyTodoService } from './weekly-todo.service';
import { DailyToDo, DailyToDoEntries, DailyToDosEntries } from '../../types';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectDailyToDos, selectDailyToDosEntries } from '../../store/weekly-to-do.selector';

@Component({
  selector: 'app-weekly-to-do',
  templateUrl: './weekly-to-do.component.html',
  styleUrls: ['./weekly-to-do.component.css']
})
export class WeeklyToDoComponent implements OnInit {

  panelOpenState = true;
  weeklyTodoForm: FormGroup;
  singleTodoForm: FormGroup;

  dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

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

  // Observables for different cases in the future ideas implementations
  // dailyToDosUncompleted$: Observable<DailyToDo[]>;
  // dailyToDosPartlyCompleted$: Observable<DailyToDo[]>;
  // dailyToDosFullyCompleted$: Observable<DailyToDo[]>;

  constructor( private fb: FormBuilder, private weeklyTodoService: WeeklyTodoService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.dailyToDosEntries$ = this.store.select(selectDailyToDosEntries);
    this.dailyToDosEntries$.subscribe(dailyToDosEntries => {
      this.dailyToDosEntries = dailyToDosEntries;
      // this.dailyToDosEntriesArr = this.getValues(this.dailyToDosEntries);
      this.dailyToDosEntriesArr = Object.values(this.dailyToDosEntries);
    });
    // update weeklyTodos from localStorage
    this.weeklyTodoService.getWeeklyTodosLocalStorage();

    this.dailyToDos$ = this.store.select(selectDailyToDos);
    // this.dailyToDosUncompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo => !dailyTodo.complete)));
    // this.dailyToDosPartlyCompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo =>
           // tslint:disable-next-line:max-line-length
    //     (dailyTodo.complete && (dailyTodo.completePart || dailyTodo.completeTarget || dailyTodo.completeLongBox || dailyTodo.completePersonalGrowth) && (!dailyTodo.completePart || !dailyTodo.completeTarget || !dailyTodo.completeLongBox || !dailyTodo.completePersonalGrowth))))
    // );
    // this.dailyToDosFullyCompleted$ = this.dailyToDos$.pipe(map(dailyTodoArr => dailyTodoArr.filter(dailyTodo =>
    //     (dailyTodo.complete && (dailyTodo.completePart && dailyTodo.completeTarget && dailyTodo.completeLongBox && dailyTodo.completePersonalGrowth))))
    // );

    this.weeklyTodoForm = this.fb.group({
      titleTarget: this.dailyToDosEntries.target.title,
      todoTextTarget: ['', [Validators.required, Validators.maxLength(150)] ],

      titlePart: this.dailyToDosEntries.part.title,
      todoTextPart: ['', [Validators.required, Validators.maxLength(150)] ],

      titleLongBox: this.dailyToDosEntries.longBox.title,
      todoTextLongBox: ['', [Validators.required, Validators.maxLength(150)] ],

      titlePersonalGrowth: this.dailyToDosEntries.personalGrowth.title,
      todoTextPersonalGrowth: ['', [Validators.required, Validators.maxLength(150)] ],
    });

    this.singleTodoForm = this.fb.group({
    });

    this.dailyToDos$.subscribe(dailyTodos => {
      this.weeklyTodoService.updateWeekyTodosLocalStorage(dailyTodos);
    });
  }

  getDate = (): string => this.weeklyTodoService.yyyymmdd(this.weeklyTodoService.currDay);
  getDay = (): string => this.dayNames[this.weeklyTodoService.currDay.getDay()];

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
      weekDay: this.getDay(),
      creationDate: this.getDate(),
      doneDate: ''
    };

    let currentDailyTodos: DailyToDo[] = [];
    this.dailyToDos$.subscribe(dailyToDoArr => {
      currentDailyTodos = dailyToDoArr;
      currentDailyTodos.unshift(newDailyTodo);
      this.weeklyTodoService.updateWeekyTodos(currentDailyTodos);
      this.resetForm();
    });
  }
}
