import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCompleteDeleteAllComponent } from './buttons-complete-delete-all.component';

describe('ButtonsCompleteDeleteAllComponent', () => {
  let component: ButtonsCompleteDeleteAllComponent;
  let fixture: ComponentFixture<ButtonsCompleteDeleteAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonsCompleteDeleteAllComponent]
    });
    fixture = TestBed.createComponent(ButtonsCompleteDeleteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
