import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, Scroll } from '@angular/router';
import { filter, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  signedIn!: boolean;

  constructor(private authService: AuthService, private router: Router) {
    router.events
      .pipe(
        filter(e => e instanceof Scroll),
        mergeMap(() => {
          this.authService.checkAuthentication();
          return this.authService.signedIn$;
        })
      )
      .subscribe(signedIn => {
        this.signedIn = signedIn;
        console.log(this.signedIn);
      });
  }
}
