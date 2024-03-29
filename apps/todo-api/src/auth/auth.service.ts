import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from './utils/bcrypt';
import { DecodedEmailJwt } from '../interfaces';
import { MailerService } from './mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user) {
      if (user.emailVerified) {
        const matched = comparePasswords(password, user.password);
        if (matched) {
          const { ...result } = user;
          return result;
        }
        throw new ForbiddenException('Bad Password');
      }
      throw new ForbiddenException('Email is not verified');
    }
    throw new NotFoundException('Email does not exist');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('Email in use');

    await this.mailerService.sendVerificationEmail(email);

    return this.usersService.create(email, password);
  }

  verifyEmail(token: string) {
    try {
      this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token signature is invalid or expired');
    }

    const jwt = this.jwtService.decode(token) as DecodedEmailJwt;

    return this.usersService.verifyEmail(jwt);
  }

  async sendResetPasswordEmail(email: string) {
    const users = await this.usersService.find(email);
    if (!users.length)
      throw new BadRequestException('This email account does not exist');

    await this.mailerService.sendPasswordResetEmail(email);
  }

  async submitResetPasswordForm(token: string, body: { password: string }) {
    await this.jwtService.verifyAsync(token).catch(err => {
      throw new UnauthorizedException(
        `This email reset link is expired: ${err}`
      );
    });
    const { email } = this.jwtService.decode(token) as DecodedEmailJwt;

    return this.usersService.changeUserPassword(email, body.password);
  }
}
