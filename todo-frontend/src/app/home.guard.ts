import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { TodoListsSelectors } from '../store/selectors/todoLists.selectors';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanLoad {
  selectors = new TodoListsSelectors();

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
    return this.store.select(this.selectors.selectUserSignedIn);
  }
}
