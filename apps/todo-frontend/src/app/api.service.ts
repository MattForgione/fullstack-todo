import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '@fullstack-todo/todo-interfaces';
import { Observable } from 'rxjs';

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

interface IApiService {
  login(email: string, password: string): Observable<AccessTokenResponse>;
  signup(email: string, password: string): Observable<any>;
  verifyEmail(token: string | null): Observable<any>;
  sendPasswordResetEmail(email: string): Observable<any>;
  submitResetPasswordForm(password: string, token: string): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService implements IApiService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private zipUrl(endpoint: string, queryString?: string) {
    return queryString
      ? `${this.url}/${endpoint}&${queryString}`
      : `${this.url}/${endpoint}`;
  }

  // auth service
  login(email: string, password: string) {
    return this.http.post<AccessTokenResponse>(
      this.zipUrl(Endpoints.AUTH_LOGIN),
      {
        email,
        password,
      }
    );
  }

  signup(email: string, password: string) {
    return this.http.post(this.zipUrl(Endpoints.AUTH_SIGNUP), {
      email,
      password,
    });
  }

  verifyEmail(token: string | null) {
    return this.http.post(this.zipUrl(Endpoints.AUTH_VERIFY_EMAIL), { token });
  }

  sendPasswordResetEmail(email: string) {
    return this.http.post(this.zipUrl(Endpoints.AUTH_PASSWORD_RESET), {
      email,
    });
  }

  submitResetPasswordForm(password: string, token: string) {
    return this.http.patch(this.zipUrl(Endpoints.resetPasswordForm(token)), {
      password,
    });
  }

  checkTokenExists(token: string) {
    return this.http.get<TokenExistsResponse>(
      this.zipUrl(Endpoints.CHECK_TOKEN, `token=${token}`)
    );
  }

  storeUsedToken(token: string) {
    return this.http.post<AddTokenResponse>(
      this.zipUrl(Endpoints.STORE_TOKEN),
      { token }
    );
  }
}
