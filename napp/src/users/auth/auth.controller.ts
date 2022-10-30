import { Body, Controller, Logger, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ILoginRes, ISignUpRes } from './interfaces';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { SignUpDto } from './auth.dtos';
import { LocalAuthGuard } from './local.guard';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  private readonly log = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('signup')
  async signUp(@Body() data: SignUpDto): Promise<ISignUpRes> {
    this.log.debug('signUp req', data);

    const user = await this.authService.registerUser(
      _.pick(data, ['firstName', 'lastName', 'email', 'password'])
    );
    const auth = {
      token: this.authService.issueJwt(user),
    };

    return { user, auth };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req): Promise<ILoginRes> {
    this.log.debug(`login request ${JSON.stringify(req.user)}`);

    return {
      user: req.user,
      auth: { token: this.authService.issueJwt(req.user) },
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyUser(@Req() { user }): Promise<User> {
    return this.authService.getMyUser(user.id);
  }
}
