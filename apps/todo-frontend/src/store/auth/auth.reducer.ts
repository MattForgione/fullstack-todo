import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  userSignedIn: boolean;
}

export const initialState: AuthState = {
  userSignedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.setUserSignedIn,
    (state, { userSignedIn }): AuthState => ({
      ...state,
      userSignedIn,
    })
  )
);
