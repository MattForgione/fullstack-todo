import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.sass'],
})
export class VerifyEmailComponent implements OnInit {
  status!: string;
  token!: string;
  tokenExists!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        mergeMap(params => {
          this.token = params.get('token') as string;

          return this.authService.checkTokenExists(this.token);
        }),
        mergeMap(({ tokenExists }) => {
          this.tokenExists = tokenExists;

          if (this.tokenExists) {
            return this.router.navigateByUrl('/auth/link-has-expired');
          }

          return this.authService.storeUsedToken(this.token);
        }),
        map(() => {
          if (!this.tokenExists) {
            return this.authService.verifyEmail(this.token).subscribe({
              next: () => {
                if (!this.tokenExists) {
                  this.status = 'Successfully verified';
                  this.cookieService.set('authToken', this.token);
                  this.authService.checkAuthentication();
                  return this.router.navigateByUrl('/');
                }

                return;
              },
              error: () => {
                this.status = 'Something went wrong while verifying!';
              },
            });
          }
          return;
        })
      )
      .subscribe();
  }
}
