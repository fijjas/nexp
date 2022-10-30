import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { usersProviders } from './users/users.providers';
import { DbModule } from '../db/db.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AliceService } from './alice/alice.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth/constants';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt.guard';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    CommonModule,
    DbModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule,
  ],
  controllers: [
    UsersController,
    AuthController,
  ],
  providers: [
    ...usersProviders,
    UsersService,
    AuthService,
    AliceService,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class UsersModule {}
