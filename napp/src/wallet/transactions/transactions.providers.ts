import { DataSource } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TRANSACTIONS_REPOSITORY } from './transactions.constants';
import { DATA_SOURCE } from '../../db/db.constants';

export const transactionsProviders = [
  {
    provide: TRANSACTIONS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Transaction),
    inject: [DATA_SOURCE],
  },
];
