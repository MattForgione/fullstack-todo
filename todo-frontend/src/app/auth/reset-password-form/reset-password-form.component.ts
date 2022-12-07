import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchPassword } from '../../shared/validators/match-password';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { finalize, map, mergeMap, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { DecodedJwtToken } from '../../../interfaces';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.sass'],
})
export class ResetPasswordFormComponent implements OnInit {
  token!: string;
  password!: string;
  tokenExists!: boolean;

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

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        mergeMap(params => {
          this.token = params.get('token') as string;

          return this.authService.checkTokenExists(this.token);
        }),
        map(({ tokenExists }) => {
          this.tokenExists = tokenExists;

          if (this.tokenExists) {
            return this.router.navigateByUrl('/auth/link-has-expired');
          }
          return;
        })
      )
      .subscribe();
  }

  onSubmit() {
    this.password = this.resetPasswordForm.value.password as string;

    this.authService
      .submitResetPasswordForm(this.password, this.token)
      .pipe(
        mergeMap(() => {
          const { email } = jwt_decode(this.token) as DecodedJwtToken;

          return this.authService.login(email, this.password).pipe(
            tap(() => {
              return this.authService.logout();
            })
          );
        }),
        finalize(() => {
          this.authService.storeUsedToken(this.token).subscribe({
            error: ({ error }) => {
              console.log(error);
            },
          });
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
