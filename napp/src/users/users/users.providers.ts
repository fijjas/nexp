import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { USERS_REPOSITORY } from './users.constants';
import { DATA_SOURCE } from '../../db/db.constants';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
