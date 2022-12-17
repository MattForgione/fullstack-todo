import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { DecodedJwtToken } from '../../interfaces';
import { Store } from '@ngrx/store';
import { TodoListsActions } from '../../store/actions/todoLists.actions';
import { TodoListsSelectors } from '../../store/selectors/todoLists.selectors';

interface AccessTokenResponse {
  access_token: string;
}

interface TokenExistsResponse {
  tokenExists: boolean;
}

interface AddTokenResponse {
  token: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;
  signedIn$ = this.store.select(new TodoListsSelectors().selectUserSignedIn);

  constructor(
    private http: HttpClient,
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
    this.store.dispatch(
      TodoListsActions.setUserSignedIn({ userSignedIn: false })
    );
    this.cookieService.delete('authToken');
  }

  login(email: string, password: string) {
    this.store.dispatch(
      TodoListsActions.setUserSignedIn({ userSignedIn: true })
    );

    return this.http.post<AccessTokenResponse>(`${this.url}/auth/login`, {
      email,
      password,
    });
  }

  checkAuthentication() {
    const cookie = this.cookieService.get('authToken');
    if (cookie && this._isCookieValid(cookie)) {
      this.store.dispatch(
        TodoListsActions.setUserSignedIn({ userSignedIn: true })
      );
      return;
    }

    this.store.dispatch(
      TodoListsActions.setUserSignedIn({ userSignedIn: false })
    );
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.url}/auth/signup`, {
      email,
      password,
    });
  }

  verifyEmail(token: string | null) {
    return this.http.post(`${this.url}/auth/verify-email`, { token });
  }

  sendPasswordResetEmail(email: string) {
    return this.http.post(`${this.url}/auth/password-reset`, {
      email,
    });
  }

  submitResetPasswordForm(password: string, token: string) {
    return this.http.patch(`${this.url}/auth/reset-password-form/${token}`, {
      password,
    });
  }

  checkTokenExists(token: string) {
    return this.http.get<TokenExistsResponse>(
      `${this.url}/auth/check-used-token-exists?token=${token}`
    );
  }

  storeUsedToken(token: string) {
    return this.http.post<AddTokenResponse>(
      `${this.url}/auth/store-used-token`,
      {
        token,
      }
    );
  }
}
