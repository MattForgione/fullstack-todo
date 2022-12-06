import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface FormLoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const { email, password } = this.loginForm.value as FormLoginData;
    this.authService.login(email, password).subscribe({
      next: token => {
        console.log(token);
        return this.router.navigateByUrl('/');
      },
      error: ({ error }) => {
        if (error) {
          this.loginForm.setErrors({ responseError: error.messages });
        }
      },
    });
  }
}
