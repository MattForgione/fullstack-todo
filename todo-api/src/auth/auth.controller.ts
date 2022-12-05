import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser.email, createUser.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyEmailToken) {
    return this.authService.verifyEmail(body.token);
  }

  @Post('password-reset')
  async resetPasswordEmail(@Body() body: ResetPasswordEmail) {
    return await this.authService.sendResetPasswordEmail(body.email);
  }
}
