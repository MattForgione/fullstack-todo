import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface AccessTokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AccessTokenResponse>(`${this.url}/auth/login`, {
      email,
      password,
    });
  }
}
