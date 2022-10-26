import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { usersProviders } from './users/users.providers';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    DbModule,
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    ...usersProviders,
    UsersService,
  ]
})
export class UsersModule {}
