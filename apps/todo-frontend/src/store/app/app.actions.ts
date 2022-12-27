import { createAction, props } from '@ngrx/store';
import { AppRoutes } from '../../app/app.routes';

export class AppActions {
  public static onHomePageEntered = createAction(
    '[Home Page] Home Page Entered'
  );

  public static onLoginPageEntered = createAction(
    '[Login Page] Login Page Entered'
  );

  public static onSignupPageEntered = createAction(
    '[Signup Page] Signup Page Entered'
  );

  public static onSelectNavLocation = createAction(
    '[Navbar] Select Nav Location',
    props<{ currentNav: AppRoutes }>()
  );
}
