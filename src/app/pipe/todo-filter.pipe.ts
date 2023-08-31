import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[], isCompleteList: boolean): Todo[] {
    if (!todos || isCompleteList === undefined) return todos;
    return todos.filter(todo => todo.complete === isCompleteList).sort((todoA, todoB) => {
      // Compare the deadline dates first
      const deadlineDateComparison = todoA.deadline.getTime() - todoB.deadline.getTime();
      // console.log(deadlineDateComparison);
      if (deadlineDateComparison !== 0) {
        return deadlineDateComparison;
      }
      // If deadline dates are equal, compare the creation dates
      return todoB.creationDate.getTime() - todoA.creationDate.getTime();
      // return (todoA.deadline.getTime() + todoA.creationDate.getTime()) - (todoB.deadline.getTime() + todoB.creationDate.getTime());
    });
  }

}
