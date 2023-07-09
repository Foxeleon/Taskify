import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOME_FEATURE_KEY, HomeState } from './home.state';

const selectHomeState = createFeatureSelector<HomeState>(HOME_FEATURE_KEY);

export const selectTabIndex = createSelector(
  selectHomeState,
  state => state.appTabIndex
);
