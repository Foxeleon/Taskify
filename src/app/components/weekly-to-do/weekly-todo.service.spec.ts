import { TestBed } from '@angular/core/testing';

import { WeeklyTodoService } from '../../services/weekly-todo.service';

describe('WeeklyTodoService', () => {
  let service: WeeklyTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
