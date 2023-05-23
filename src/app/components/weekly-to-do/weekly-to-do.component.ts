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

  getTextAreaState(meaning: string): boolean {
    switch (meaning) {
      case this.dailyToDos.target.meaning:
        return this.todoTextArea.target;
      case this.dailyToDos.part.meaning:
        return this.todoTextArea.part;
      case this.dailyToDos.longBox.meaning:
        return this.todoTextArea.longBox;
      case this.dailyToDos.personalGrowth.meaning:
        return this.todoTextArea.personalGrowth;
    }
  }

  getValues(object: DailyToDos): DailyToDo[] {
    return Object.values(object);
  }

  setTodoTextAreaState(meaning: string) {
    switch (meaning) {
      case this.dailyToDos.target.meaning: {
        this.todoTextArea.target = !this.todoTextArea.target;
        this.todoTextIconClass.target.right = this.todoTextArea.target;
        this.todoTextIconClass.target.down = !this.todoTextArea.target;
        this.todoTextIconClass.target.yellow = !this.todoTextArea.target;
      }
                                           break;
      case this.dailyToDos.part.meaning: {
        this.todoTextArea.part = !this.todoTextArea.part;
        this.todoTextIconClass.part.right = this.todoTextArea.part;
        this.todoTextIconClass.part.down = !this.todoTextArea.part;
        this.todoTextIconClass.part.yellow = !this.todoTextArea.part;
      }
                                         break;
      case this.dailyToDos.longBox.meaning: {
        this.todoTextArea.longBox = !this.todoTextArea.longBox;
        this.todoTextIconClass.longbox.right = !this.todoTextArea.longBox;
        this.todoTextIconClass.longbox.down = !this.todoTextArea.longBox;
        this.todoTextIconClass.longbox.yellow = !this.todoTextArea.longBox;
      }
                                            break;
      case this.dailyToDos.personalGrowth.meaning: {
        this.todoTextArea.personalGrowth = !this.todoTextArea.personalGrowth;
        this.todoTextIconClass.personalgrowth.right = !this.todoTextArea.personalGrowth;
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
