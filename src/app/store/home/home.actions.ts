import { createAction, props } from '@ngrx/store';

export class HomeActions {
  static readonly setTabIndex = createAction('[Home] select index of todo tab', props<{appTabIndex: number}>());
  static readonly setLanguage = createAction('[Home] set language', props<{appLanguage: string}>());
}
