import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';

interface VerifyEmailToken {
  token: string;
}

interface ResetPasswordEmail {
  email: string;
}

interface ResetPasswordFormSubmission {
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser.email, createUser.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() body: VerifyEmailToken) {
    return this.authService.verifyEmail(body.token);
  }

  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  async resetPasswordEmail(@Body() body: ResetPasswordEmail) {
    return await this.authService.sendResetPasswordEmail(body.email);
  }

  @Patch('reset-password-form/:token')
  @HttpCode(HttpStatus.OK)
  async passwordResetFormSubmission(
    @Param('token') token: string,
    @Body() body: ResetPasswordFormSubmission
  ) {
    return this.authService.submitResetPasswordForm(token, body);
  }
}
