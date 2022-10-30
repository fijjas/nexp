import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJwtPayload, ILoginReq } from './interfaces';
import { User } from '../users/user.entity';
import { AliceService } from '../alice/alice.service';
import { JwtService } from '@nestjs/jwt';
import { DeepPartial } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private readonly log = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly aliceService: AliceService,
    private readonly jwtService: JwtService,
  ) {
  }

  async getMyUser(authUserId: number): Promise<User> {
    return this.usersService.getOne(authUserId);
  }

  async registerUser(data: DeepPartial<User>): Promise<User> {
    const pwdHashSalt = this.aliceService.generateSalt();
    const pwdHash = await this.aliceService.hashPassword(data.password, pwdHashSalt);
    const storedPwdHash = this.aliceService.hashToStored({
      salt: pwdHashSalt,
      hash: pwdHash,
    });
    return this.usersService.createFromRaw({
      ..._.pick(data, ['firstName', 'lastName', 'email']),
      password: storedPwdHash,
    });
  }

  async validateLogin(credentials: ILoginReq): Promise<User|null> {
    this.log.debug(`validateLogin() ${JSON.stringify(credentials)}`);
    const user = await this.usersService.findByEmail(credentials.email);
    if (user) {
      const { salt, hash } = await this.aliceService.hashFromStored(user.password);
      const isValid = await this.aliceService.checkPassword(credentials.password, hash, salt);
      return isValid ? user : null;
    }
    return null;
  }

  async validateJwt(): Promise<User> {
    return null; // TODO ?
  }

  issueJwt(user: User): string {
    const jwtPayload: IJwtPayload = {
      sub: user.id,
      iat: new Date().getTime(),
    };
    return this.jwtService.sign(jwtPayload);
  }
}
