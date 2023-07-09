import { HOME_FEATURE_KEY, HomeState } from './home.state';

export interface AppState {
  [HOME_FEATURE_KEY]?: HomeState;
}
