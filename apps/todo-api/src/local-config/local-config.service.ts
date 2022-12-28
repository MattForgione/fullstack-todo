import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface ILocalConfigService {
  devMode(): string;
  apiUrl(): string;
  transportHost(): string;
  transportPort(): number;
  emailUser(): string;
  emailPass(): string;
  emailFromUsername(): string;
  emailFromEmail(): string;
  jwtSecret(): string;
  dbName(): string;
  clientUrl(): string;
}

@Injectable()
export class LocalConfigService implements ILocalConfigService {
  constructor(private configService: ConfigService) {}

  private getToken(tokenName: string) {
    return this.configService.get(tokenName);
  }

  devMode(): string {
    return this.getToken('DEV_MODE');
  }

  apiUrl(): string {
    return this.getToken('API_URL');
  }

  dbName(): string {
    return this.getToken('DB_NAME');
  }

  emailFromEmail(): string {
    return this.getToken('FROM_EMAIL');
  }

  emailFromUsername(): string {
    return this.getToken('FROM_USERNAME');
  }

  emailPass(): string {
    return this.getToken('EMAIL_PASS');
  }

  emailUser(): string {
    return this.getToken('EMAIL_USER');
  }

  jwtSecret(): string {
    return this.getToken('JWT_SECRET');
  }

  transportHost(): string {
    return this.getToken('TRANSPORT_HOST');
  }

  transportPort(): number {
    return this.getToken('TRANSPORT_PORT');
  }

  clientUrl(): string {
    return this.getToken('CLIENT_URL');
  }
}
