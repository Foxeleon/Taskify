import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[], isCompleteList: boolean): Todo[] {
    if (!todos || isCompleteList === undefined) return todos;
    // Compare the deadline dates first, If deadline dates are equal, compare the creation dates
    return todos.filter(todo => todo.complete === isCompleteList).sort((todoA, todoB) =>
      todoA.deadline.getTime() - todoB.deadline.getTime() + todoB.creationDate.getTime() - todoA.creationDate.getTime());
  }
}
