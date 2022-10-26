import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { USERS_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../db/constants';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
