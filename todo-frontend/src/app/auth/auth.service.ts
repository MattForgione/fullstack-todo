import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

interface AccessTokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;
  signedIn$ = of(false);

  constructor(private http: HttpClient) {}

  logout() {
    this.signedIn$ = of(false);

    return this.signedIn$;
  }

  login(email: string, password: string) {
    this.signedIn$ = of(true);

    return this.http.post<AccessTokenResponse>(`${this.url}/auth/login`, {
      email,
      password,
    });
  }
}
