import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.sass'],
})
export class VerifyEmailComponent implements OnInit {
  status!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.verify();
  }

  private verify() {
    this.activatedRoute.paramMap.subscribe(params => {
      try {
        const token = params.get('token');

        this.authService.verifyEmail(token).subscribe({
          next: () => {
            this.status = 'Successfully verified';
            this.cookieService.set('authToken', token as string);
            this.authService.checkAuthentication();
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.status = 'Something went wrong while verifying!';
          },
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}
