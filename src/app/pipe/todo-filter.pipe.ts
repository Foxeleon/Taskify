import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[], isCompleteList: boolean): Todo[] {
    if (!todos || isCompleteList === undefined) return todos;
    return todos.filter(todo => todo.complete === isCompleteList);
  }

}
