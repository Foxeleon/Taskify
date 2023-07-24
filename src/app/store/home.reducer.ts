import { createReducer, on } from '@ngrx/store';
import { HomeActions } from './home.actions';
import { HomeState } from './home.state';


export const initialState: HomeState = {
  appTabIndex: 1
};

export const homeReducer = createReducer(
  initialState,
  on(HomeActions.setTabIndex, (state, {appTabIndex}) => ({...state, appTabIndex})),
);
