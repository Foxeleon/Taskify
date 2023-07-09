import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyToDosListComponent } from './weekly-to-dos-list.component';

describe('WeeklyToDosListComponent', () => {
  let component: WeeklyToDosListComponent;
  let fixture: ComponentFixture<WeeklyToDosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyToDosListComponent]
    });
    fixture = TestBed.createComponent(WeeklyToDosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
