import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDoneComponent } from './todo-list-done.component';

describe('TodoListDoneComponent', () => {
  let component: TodoListDoneComponent;
  let fixture: ComponentFixture<TodoListDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
