import { Matches } from 'class-validator';

export class PasswordResetDto {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one number, and a special character',
    }
  )
  password: string;
}
