import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WeeklyTodoService } from '../../weekly-todo.service';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-weekly-to-do',
  templateUrl: './weekly-to-do.component.html',
  styleUrls: ['./weekly-to-do.component.css']
})
export class WeeklyToDoComponent implements OnInit {
  panelOpenState = false;
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

  constructor( private fb: FormBuilder, private tdService: WeeklyTodoService ) {}

  ngOnInit(): void {
    this.weeklyTodoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(25)] ],
      todoText: ['', [Validators.required, Validators.maxLength(150)] ],
      deadline: [this.tdService.yyyymmdd(this.tdService.currDay), [Validators.required]]
    });
  }

  resetForm() {
    this.weeklyTodoForm.patchValue({
      todoText: ''
    });
  }

  setId() {
    return this.tdService.todoId++;
  }

  setTodo(): void {
    this.tdService.weeklyTodo = {
      id: this.setId(),
      title: this.weeklyTodoForm.value.title,
      todoText: this.weeklyTodoForm.value.todoText,
      complete: false,
      creationDate: this.tdService.yyyymmdd(this.tdService.currDay),
      doneDate: '',
      deadline: this.weeklyTodoForm.value.deadline
    };
    this.weeklyTodos.unshift(this.tdService.todo);
    this.tdService.updateTodoStore(this.weeklyTodos);
    const todoId = JSON.stringify(this.tdService.todoId);
    localStorage.setItem('todoId', todoId);
  }
}
