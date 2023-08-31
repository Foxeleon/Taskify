import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../types';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { HomeActions } from '../../store/home/home.actions';
import { selectTabIndex } from '../../store/home/home.selector';
import { map, Observable, shareReplay } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // todos: Todo[] = [];
  todos$: Observable<Todo[]>;

  todosUncompleted: Todo[] = [];
  accordeonActive = true;
  holdTitle: boolean;
  todoTextArea = false;
  currTitle: string;
  todoTextIconClass = {
    right: !this.todoTextArea,
    down: this.todoTextArea,
    yellow: this.todoTextArea,
    triangle: true,
    icon: true,
    ui: true
  };
  todoForm: FormGroup;

  tabIndex$: Observable<number>;
  isHandset$: Observable<boolean>;

  constructor( private fb: FormBuilder, private tdService: TodoService, private store: Store<AppState>, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches), shareReplay());
    this.tabIndex$ = this.store.select(selectTabIndex);
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(25)] ],
      todoText: ['', [Validators.required, Validators.maxLength(150)] ],
      deadline: [this.tdService.yyyymmdd(new Date()), [Validators.required]]
    });
    this.tdService.todoId = JSON.parse(localStorage.getItem('todoId'));
    // TODO change to ngrx
    if (this.tdService.todoId == null) {
      this.setId();
    }
    this.holdTitle = JSON.parse(localStorage.getItem('titleState'));
    if (this.holdTitle == null) {
      this.holdTitle = false;
    }
    this.todoTextArea = JSON.parse(localStorage.getItem('todoTextState'));
    if (this.todoTextArea == null) {
      this.todoTextArea = false;
    }
    this.currTitle = JSON.parse(localStorage.getItem('formTitle'));
    if (this.currTitle == null) {
        this.currTitle = this.todoForm.value.title;
    }
    this.todoForm.patchValue({
      title: this.currTitle
    });
    this.accordeonActive = JSON.parse(localStorage.getItem('accordeonState'));
    if (this.accordeonActive == null) {
        this.accordeonActive = true;
    }
    this.todoTextIconClass = {
      right: !this.todoTextArea,
      down: this.todoTextArea,
      yellow: this.todoTextArea,
      triangle: true,
      icon: true,
      ui: true
    };

    this.tdService.initTodos();
    this.todos$ = this.tdService.getTodosObservable();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.store.dispatch(HomeActions.setTabIndex({appTabIndex: tabChangeEvent.index}));
  }

  setTab(appTabIndex: number) {
    this.store.dispatch(HomeActions.setTabIndex({appTabIndex}));
  }

  setTodo(): void {
    const deadline: Date = new Date(this.todoForm.value.deadline);
    deadline.setHours(23, 59, 59, 999);
    this.tdService.setTodo(this.todoForm.value.title, this.todoForm.value.todoText, deadline);
    this.resetForm();
  }

  setTitleState() {
    this.holdTitle = !this.holdTitle;
    const titleState = JSON.stringify(this.holdTitle);
    localStorage.setItem('titleState', titleState);
    if (this.holdTitle === false) {
      localStorage.setItem('formTitle', null);
    } else {
      let formTitle = '';
      formTitle = JSON.stringify(this.currTitle);
      localStorage.setItem('formTitle', formTitle);
    }
  }

  setAccordeonState() {
    this.accordeonActive = !this.accordeonActive;
    const accordeonState = JSON.stringify(this.accordeonActive);
    localStorage.setItem('accordeonState', accordeonState);
  }

  setTodoTextAreaState() {
    this.todoTextArea = !this.todoTextArea;
    const todoAreaState = JSON.stringify(this.todoTextArea);
    localStorage.setItem('todoTextState', todoAreaState);
    this.todoTextIconClass.right = !this.todoTextArea;
    this.todoTextIconClass.down = this.todoTextArea;
    this.todoTextIconClass.yellow = this.todoTextArea;
  }

  setId() {
    return this.tdService.todoId++;
  }

  resetForm() {
    this.currTitle = this.todoForm.value.title;
    if (this.holdTitle === true) {
      this.todoForm.patchValue({
        title: this.currTitle,
        todoText: ''
      });
      const formTitle = JSON.stringify(this.currTitle);
      localStorage.setItem('formTitle', formTitle);
    } else {
      this.todoForm.patchValue({
        title: '',
        todoText: ''
      });
      this.currTitle = this.todoForm.value.title;
      const formTitle = JSON.stringify(this.currTitle);
      localStorage.setItem('formTitle', formTitle);
    }
  }
}
