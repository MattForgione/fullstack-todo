import { BadRequestException, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { LocalConfigService } from '../local-config/local-config.service';

@Injectable()
export class MailerService {
  private readonly _transporter: Transporter = nodemailer.createTransport({
    host: this.localConfig.transportHost(),
    port: this.localConfig.transportPort(),
    secure: false,
    auth: {
      user: this.localConfig.emailUser(),
      pass: this.localConfig.emailPass(),
    },
  });

  constructor(
    private jwtService: JwtService,
    private localConfig: LocalConfigService
  ) {}

  private readonly _fromLineString = `${this.localConfig.emailFromUsername()} <${this.localConfig.emailFromEmail()}>`;

  async sendVerificationEmail(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload);

    try {
      await this._transporter.sendMail({
        from: this._fromLineString,
        to: email,
        subject: 'Verify your account',
        html: `<a id="verification-link" href="${this.localConfig.clientUrl()}/auth/verify-email/${token}">Click here to verify!</a>`,
      });
    } catch (err) {
      throw new BadRequestException(`Something went wrong: ${err}`);
    }
  }
}
