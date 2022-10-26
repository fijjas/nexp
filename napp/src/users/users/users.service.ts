import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepo: Repository<User>,
  ) {
  }

  async getAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
}
