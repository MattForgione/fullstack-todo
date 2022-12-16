import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as TodoListsActions from '../../../store/actions/todoLists.actions';

interface FormLoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(TodoListsActions.onLoginPageEntered());
  }

  onSubmit() {
    const { email, password } = this.loginForm.value as FormLoginData;
    return this.authService.login(email, password).subscribe({
      next: tokenResponse => {
        this.cookieService.set('authToken', tokenResponse.access_token);
        return this.router.navigateByUrl('/');
      },
      error: ({ error }) => {
        if (error) {
          this.loginForm.setErrors({ responseError: error.message });
        }
      },
    });
  }
}
