import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WeeklyTodoService } from '../../weekly-todo.service';
import { DailyToDo, DailyToDos } from '../../types';

@Component({
  selector: 'app-weekly-to-do',
  templateUrl: './weekly-to-do.component.html',
  styleUrls: ['./weekly-to-do.component.css']
})
export class WeeklyToDoComponent implements OnInit {
  panelOpenState = true;
  weeklyTodoForm: any;
  weeklyTodos: any[] = [];
  todoTextArea = false;
  todoTextIconClass = {
    right: !this.todoTextArea,
    down: this.todoTextArea,
    yellow: this.todoTextArea,
    triangle: true,
    icon: true,
    ui: true
  };

  dailyToDos: DailyToDos = {
    target: {
      meaning: 'Target',
      title: 'ЦЕЛЬ',
      icon: 'crosshairs',
      todoTextPlaceholder: 'Главная задача на день'
    },
    part: {
      meaning: 'Part',
      title: 'ЧАСТЬ ЗАДАЧИ',
      icon: 'tasks',
      todoTextPlaceholder: 'Часть длительного дела, которые решается в несколько этапов'
    },
    longBox: {
      meaning: 'LongBox',
      title: 'ДОЛГИЙ ЯЩИК',
      icon: 'clock',
      todoTextPlaceholder: 'Не срочное дело, которое давно надо бы сделать'
    },
    personalGrowth: {
      meaning: 'PersonalGrowth',
      title: 'РОСТ',
      icon: 'chess king',
      todoTextPlaceholder: 'Всё что увеличит ваш "личностный рост" сегодня'
    }
  };
  dailyToDoArr: DailyToDo[] = this.getValues(this.dailyToDos);

  constructor( private fb: FormBuilder, private tdService: WeeklyTodoService ) {}

  ngOnInit(): void {
    this.weeklyTodoForm = this.fb.group({
      titleTarget: this.dailyToDos.target.title,
      todoTextTarget: ['', [Validators.required, Validators.maxLength(150)] ],

      titlePart: this.dailyToDos.part.title,
      todoTextPart: ['', [Validators.required, Validators.maxLength(150)] ],

      titleLongBox: this.dailyToDos.longBox.title,
      todoTextLongBox: ['', [Validators.required, Validators.maxLength(150)] ],

      titlePersonalGrowth: this.dailyToDos.personalGrowth.title,
      todoTextPersonalGrowth: ['', [Validators.required, Validators.maxLength(150)] ],
    });
  }

  getValues(object: DailyToDos): DailyToDo[] {
    return Object.values(object);
  }

  setTodoTextAreaState() {
    this.todoTextArea = !this.todoTextArea;
    this.todoTextIconClass.right = !this.todoTextArea;
    this.todoTextIconClass.down = this.todoTextArea;
    this.todoTextIconClass.yellow = this.todoTextArea;
  }

  resetForm() {
    this.weeklyTodoForm.patchValue({
      todoTextTarget: '',
      todoTextPart: '',
      todoTextLongBox: '',
      todoTextPersonalGrowth: '',
    });
  }

  setId() {
    return this.tdService.todoId++;
  }

  setTodo(): void {
    console.log('add');
    // this.tdService.weeklyTodo = {
    //   id: this.setId(),
    //   title: this.weeklyTodoForm.value.title,
    //   todoText: this.weeklyTodoForm.value.todoText,
    //   complete: false,
    //   creationDate: this.tdService.yyyymmdd(this.tdService.currDay),
    //   doneDate: '',
    //   deadline: this.weeklyTodoForm.value.deadline
    // };
    // this.weeklyTodos.unshift(this.tdService.todo);
    // this.tdService.updateTodoStore(this.weeklyTodos);
    // const todoId = JSON.stringify(this.tdService.todoId);
    // localStorage.setItem('todoId', todoId);
  }
}
