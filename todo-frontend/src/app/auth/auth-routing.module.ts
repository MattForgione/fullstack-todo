import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'verify-email/:token',
    component: VerifyEmailComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'reset-password-form/:token',
    component: ResetPasswordFormComponent,
  },
  {
    path: 'link-has-expired',
    component: LinkExpiredComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
