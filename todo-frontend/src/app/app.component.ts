import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, Scroll } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { AppRoutes } from './app.routes';
import { Store } from '@ngrx/store';
import { AppActions } from '../store/app/app.actions';
import { AppSelectors } from '../store/app/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  signedIn!: boolean;

  constructor(
    public store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    router.events
      .pipe(
        filter(e => e instanceof Scroll),
        mergeMap(() => {
          this.authService.checkAuthentication();
          return this.authService.signedIn$;
        })
      )
      .subscribe(signedIn => {
        this.signedIn = signedIn;
      });
  }

  public get routes(): typeof AppRoutes {
    return AppRoutes;
  }

  public selectCurrentNav(route: AppRoutes) {
    this.store.dispatch(AppActions.onSelectNavLocation({ currentNav: route }));
  }

  public compareCurrentNav(route: AppRoutes) {
    return this.store
      .select(new AppSelectors().selectCurrentNav)
      .pipe(map(currentNav => currentNav === route));
  }
}
