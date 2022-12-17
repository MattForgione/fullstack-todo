import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.checkAuthentication();

    return this.store.select(new AuthSelectors().selectUserSignedIn);
  }
}
