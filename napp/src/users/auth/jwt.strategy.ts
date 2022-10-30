import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWT_HEADER, JWT_SECRET } from './constants';
import { IJwtPayload } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly log = new Logger(JwtStrategy.name);

  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.headers[JWT_HEADER] as string,
      ]),
      ignoreExpiration: false,
    });
  }

  async validate(jwtPayload: IJwtPayload): Promise<any> {
    return { id: +jwtPayload.sub };
  }
}
