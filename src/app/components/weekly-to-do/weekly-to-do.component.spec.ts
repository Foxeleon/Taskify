import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyToDoComponent } from './weekly-to-do.component';

describe('WeeklyToDoComponent', () => {
  let component: WeeklyToDoComponent;
  let fixture: ComponentFixture<WeeklyToDoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeeklyToDoComponent]
    });
    fixture = TestBed.createComponent(WeeklyToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
