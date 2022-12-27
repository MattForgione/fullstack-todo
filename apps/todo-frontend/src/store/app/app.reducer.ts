import { AppRoutes } from '../../app/app.routes';
import { createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';

export interface AppState {
  currentNav: AppRoutes | null;
}

export const initialState: AppState = {
  currentNav: null,
};

export const appReducer = createReducer(
  initialState,
  on(
    AppActions.onHomePageEntered,
    (state): AppState => ({
      ...state,
      currentNav: AppRoutes.HOME,
    })
  ),
  on(
    AppActions.onLoginPageEntered,
    (state): AppState => ({
      ...state,
      currentNav: AppRoutes.LOGIN,
    })
  ),
  on(
    AppActions.onSignupPageEntered,
    (state): AppState => ({
      ...state,
      currentNav: AppRoutes.SIGNUP,
    })
  ),
  on(
    AppActions.onSelectNavLocation,
    (state, { currentNav }): AppState => ({
      ...state,
      currentNav,
    })
  )
);
