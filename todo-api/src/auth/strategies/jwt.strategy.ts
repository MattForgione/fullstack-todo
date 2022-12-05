import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LocalConfigService } from '../../local-config/local-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private localConfigService: LocalConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: localConfigService.jwtSecret(),
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
