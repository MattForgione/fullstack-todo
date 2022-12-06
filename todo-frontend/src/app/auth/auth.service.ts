import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { DecodedJwtToken } from '../../interfaces';

interface AccessTokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;
  signedIn$ = of(false);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private _isCookieValid(cookie: string): boolean {
    if (cookie) {
      const { exp } = jwt_decode(cookie) as DecodedJwtToken;

      // check if token is expired
      return Math.floor(Date.now() / 1000) < exp;
    }

    return false;
  }

  logout() {
    this.signedIn$ = of(false);
    this.cookieService.delete('authToken');

    return this.signedIn$;
  }

  login(email: string, password: string) {
    this.signedIn$ = of(true);

    return this.http.post<AccessTokenResponse>(`${this.url}/auth/login`, {
      email,
      password,
    });
  }

  checkAuthentication() {
    const cookie = this.cookieService.get('authToken');
    if (cookie && this._isCookieValid(cookie)) {
      this.signedIn$ = of(true);
      return;
    }

    this.signedIn$ = of(false);
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
}
