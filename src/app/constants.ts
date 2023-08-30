import { DailyToDosEntries, Todo } from './types';

export const dailyToDosEntries: DailyToDosEntries = {
  target: {
    meaning: 'Target',
    title: 'dailyToDosEntries.target-title',
    icon: 'crosshairs',
    todoTextPlaceholder: 'dailyToDosEntries.target-todoTextPlaceholder'
  },
  part: {
    meaning: 'Part',
    title: 'dailyToDosEntries.part-title',
    icon: 'tasks',
    todoTextPlaceholder: 'dailyToDosEntries.part-todoTextPlaceholder'
  },
  longBox: {
    meaning: 'LongBox',
    title: 'dailyToDosEntries.longBox-title',
    icon: 'clock',
    todoTextPlaceholder: 'dailyToDosEntries.longBox-todoTextPlaceholder'
  },
  personalGrowth: {
    meaning: 'PersonalGrowth',
    title: 'dailyToDosEntries.personalGrowth-title',
    icon: 'chess king',
    todoTextPlaceholder: 'dailyToDosEntries.personalGrowth-todoTextPlaceholder'
  }
};

export const initTodos: Todo[] = [
  {
    uniqueId: 'Example-UniqueId',
    id: 0,
    title: 'Example todo',
    todoText: 'Delete or complete this todo',
    complete: false,
    creationDate: '2023-09-01',
    doneDate: '',
    deadline: '2033-09-01'
  }
];
