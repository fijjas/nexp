import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthErrors } from './constants';
import { LoginDto } from './auth.dtos';
import { validateSync  } from 'class-validator';
import * as _ from 'lodash';

// Note: Guards are supposed to be called before validation pipes,
// this is a workaround allowing to validate login req body
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context, status) {
    const request = context.switchToHttp().getRequest();
    if (err || !user) {
      const loginDto = new LoginDto();
      Object.assign(loginDto, _.pick(request.body || {}, ['username', 'password']));
      const errors = validateSync(loginDto);
      if (errors.length) {
        throw new BadRequestException(_.invokeMap(errors, 'toString').join('; '));
      }
      throw err || new UnauthorizedException(AuthErrors.LOGIN_ERROR);
    }
    return user;
  }
}
