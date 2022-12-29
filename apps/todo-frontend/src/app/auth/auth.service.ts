import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { DecodedJwtToken } from '../../interfaces';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../../store/auth/auth.selectors';
import { AuthActions } from '../../store/auth/auth.actions';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedIn$ = this.store.select(new AuthSelectors().selectUserSignedIn);

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private store: Store
  ) {}

  private _isCookieValid(cookie: string): boolean {
    if (cookie) {
      const { exp } = jwt_decode(cookie) as DecodedJwtToken;

      // check if token is expired
      return Math.floor(Date.now() / 1000) < exp;
    }

    return false;
  }

  logout() {
    this.store.dispatch(AuthActions.setUserSignedIn({ userSignedIn: false }));
    this.cookieService.delete('authToken');
  }

  login(email: string, password: string) {
    this.store.dispatch(AuthActions.setUserSignedIn({ userSignedIn: true }));

    return this.apiService.login(email, password);
  }

  checkAuthentication() {
    const cookie = this.cookieService.get('authToken');
    if (cookie && this._isCookieValid(cookie)) {
      this.store.dispatch(AuthActions.setUserSignedIn({ userSignedIn: true }));
      return this.signedIn$;
    }

    this.store.dispatch(AuthActions.setUserSignedIn({ userSignedIn: false }));
    return this.signedIn$;
  }

  signup(email: string, password: string) {
    return this.apiService.signup(email, password);
  }

  verifyEmail(token: string | null) {
    return this.apiService.verifyEmail(token);
  }

  sendPasswordResetEmail(email: string) {
    return this.apiService.sendPasswordResetEmail(email);
  }

  submitResetPasswordForm(password: string, token: string) {
    return this.apiService.submitResetPasswordForm(password, token);
  }

  checkTokenExists(token: string) {
    return this.apiService.checkTokenExists(token);
  }

  storeUsedToken(token: string) {
    return this.apiService.storeUsedToken(token);
  }
}
