import { createAction, props } from '@ngrx/store';

export class AuthActions {
  public static setUserSignedIn = createAction(
    '[Application Message] Set User Sign In Status',
    props<{ userSignedIn: boolean }>()
  );
}
