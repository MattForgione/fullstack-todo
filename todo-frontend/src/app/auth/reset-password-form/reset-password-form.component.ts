import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchPassword } from '../../shared/validators/match-password';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { mergeMap, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { DecodedJwtToken } from '../../../interfaces';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.sass'],
})
export class ResetPasswordFormComponent {
  token!: string;
  password!: string;

  resetPasswordForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3)]],
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private fb: FormBuilder,
    private matchPassword: MatchPassword,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  onSubmit() {
    this.activatedRoute.paramMap
      .pipe(
        mergeMap(params => {
          this.token = params.get('token') as string;
          this.password = this.resetPasswordForm.value.password as string;

          return this.authService.submitResetPasswordForm(
            this.password,
            this.token
          );
        }),
        mergeMap(() => {
          const { email } = jwt_decode(this.token) as DecodedJwtToken;

          return this.authService.login(email, this.password).pipe(
            tap(() => {
              return this.authService.logout();
            })
          );
        })
      )
      .subscribe({
        next: loginData => {
          this.cookieService.set('authToken', loginData.access_token);
          return this.router.navigateByUrl('/');
        },
        error: ({ error }) => {
          if (error) {
            this.resetPasswordForm.setErrors({ responseError: error.message });
          }
        },
      });
  }
}
