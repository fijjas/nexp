import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { USERS_REPOSITORY, UsersErrors } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepo: Repository<User>,
  ) {
  }

  async getOne(id: number): Promise<User> {
    return this.usersRepo.findOneBy({ id });
  }

  async search(keyword: string): Promise<User[]> {
    const { tableName } = this.usersRepo.metadata;
    // the second check against sql injections (couldn't figure out how to pass a param to LIKE)
    if (!/^\w{2,255}$/.test(keyword)) {
      throw new BadRequestException('Invalid keyword');
    }

    return this.usersRepo.createQueryBuilder(tableName)
      .select(['id', 'firstName', 'lastName'].map(c => `${tableName}.${c}`).join(', '))
      .where(`${tableName}.firstName LIKE '${keyword}%'`)
      .orWhere(`${tableName}.lastName LIKE '${keyword}%'`)
      .orderBy(`${tableName}.firstName`, 'ASC')
      .limit(100)
      .getRawMany();
  }

  async createFromRaw(data: DeepPartial<User>): Promise<User> {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user).catch((e) => {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(UsersErrors.DUPLICATE_EMAIl);
      }
      throw e;
    });
  }

  async findByEmail(email: string): Promise<User|null> {
    return this.usersRepo.findOneBy({ email });
  }
}
