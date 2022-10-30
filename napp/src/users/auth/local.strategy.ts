import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthErrors } from './constants';
import { User } from '../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly log = new Logger(LocalStrategy.name);

  constructor(
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<User|null> {
    this.log.warn(`validate() username: ${username}, password: ***(${password?.length})`);

    const user = await this.authService
      .validateLogin({
        email: username,
        password,
      })
      .catch((e) => {
        this.log.error(`validate() internal error: ${e.message}`);
        throw new InternalServerErrorException();
      });

    if (!user) {
      this.log.debug('no user matching the login request');
      throw new UnauthorizedException(AuthErrors.LOGIN_ERROR);
    }

    return user;
  }
}
