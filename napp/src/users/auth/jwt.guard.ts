import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthErrors } from './constants';
import { AuthenticatedRequestHeadersDto } from './auth.dtos';
import { validateSync  } from 'class-validator';
import * as _ from 'lodash';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context, status) {
    const request = context.switchToHttp().getRequest();
    if (err || !user) {
      const arDto = new AuthenticatedRequestHeadersDto();
      Object.assign(arDto, _.pick(request.headers || {}, ['token']));
      const errors = validateSync(arDto);
      if (errors.length) {
        throw new BadRequestException(_.invokeMap(errors, 'toString').join('; '));
      }
      throw err || new UnauthorizedException(AuthErrors.JWT_AUTH_ERROR);
    }
    return user;
  }
}
