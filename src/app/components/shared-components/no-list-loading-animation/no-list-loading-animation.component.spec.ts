import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoListLoadingAnimationComponent } from './no-list-loading-animation.component';

describe('NoListLoadingAnimationComponent', () => {
  let component: NoListLoadingAnimationComponent;
  let fixture: ComponentFixture<NoListLoadingAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoListLoadingAnimationComponent]
    });
    fixture = TestBed.createComponent(NoListLoadingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
