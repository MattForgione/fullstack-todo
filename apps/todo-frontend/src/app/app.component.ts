import { Component } from '@angular/core';
import { AppRoutes } from './app.routes';
import { Store } from '@ngrx/store';
import { AppActions } from '../store/app/app.actions';
import { AppSelectors } from '../store/app/app.selectors';
import { AuthSelectors } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  signedIn$ = this.store.select(new AuthSelectors().selectUserSignedIn);

  constructor(public store: Store) {}

  public get routes(): typeof AppRoutes {
    return AppRoutes;
  }

  public selectCurrentNav(route: AppRoutes) {
    this.store.dispatch(AppActions.onSelectNavLocation({ currentNav: route }));
  }

  public compareCurrentNav(route: AppRoutes) {
    return this.store.select(new AppSelectors().compareNavWithCurrent(route));
  }
}
