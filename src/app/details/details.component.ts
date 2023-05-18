import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public id: number;
  public todos: [];
  public todo: any;
  public creationDate: Date;
  public doneDate: Date;
  public deadlineDate: Date;
  public daysTillDone: number;
  public daysTillDeadline: number;
  public daysCurrDuration: number;

  constructor( private route: ActivatedRoute, public tdService: TodoService ) { }

  ngOnInit() {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.tdService.allTodos = JSON.parse(localStorage.getItem('todoStore'));
      if (this.tdService.allTodos == null) {
        this.tdService.allTodos = [];
      }
      this.todo = this.getTodo(this.tdService.allTodos);
      this.creationDate = new Date(this.todo.creationDate);
      this.doneDate = new Date(this.todo.doneDate);
      this.deadlineDate = new Date(this.todo.deadline);
      this.daysTillDone = +this.countDays(this.creationDate, this.doneDate);
      this.daysTillDeadline = +this.countDays(this.tdService.currDay, this.deadlineDate);
      this.daysCurrDuration = +this.countDays(this.creationDate, this.tdService.currDay);
    }

  getTodo(arr: Todo[]) {
      for ( const ele of arr) {
        if (ele.id === this.id) {
          return ele;
        }
      }
    }

  countDays(dateFrom: Date, dateTo: Date) {
    const timeFrom = dateFrom.getTime();
    const timeTo = dateTo.getTime();
    const days: number = ((timeTo - timeFrom) / (24 * 3600 * 1000));
    if (days % 1 === 0) {
        return days;
    } else {
        return days.toFixed(2);
    }
  }
}
