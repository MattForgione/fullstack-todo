import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface ILocalConfigService {
  devMode: string;
  apiUrl: string;
  transportHost: string;
  transportPort: number;
  emailUser: string;
  emailPass: string;
  emailFromUsername: string;
  emailFromEmail: string;
  jwtSecret: string;
  dbName: string;
  clientUrl: string;
}

@Injectable()
export class LocalConfigService implements ILocalConfigService {
  constructor(private configService: ConfigService) {}

  private getToken(tokenName: string) {
    return this.configService.get(tokenName);
  }

  devMode: string = this.getToken('DEV_MODE');

  apiUrl: string = this.getToken('API_URL');

  dbName: string = this.getToken('DB_NAME');

  emailFromEmail: string = this.getToken('FROM_EMAIL');

  emailFromUsername: string = this.getToken('FROM_USERNAME');

  emailPass: string = this.getToken('EMAIL_PASS');

  emailUser: string = this.getToken('EMAIL_USER');

  jwtSecret: string = this.getToken('JWT_SECRET');

  transportHost: string = this.getToken('TRANSPORT_HOST');

  transportPort: number = this.getToken('TRANSPORT_PORT');

  clientUrl: string = this.getToken('CLIENT_URL');
}
