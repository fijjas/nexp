import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './db.constants';
import { TransactionsToUsersSubscriber } from '../wallet/transactions/transactions.subscribers';

export const dbProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'gate.devil.ru.net',
        port: 33601,
        username: 'root',
        password: 'jD8lD8aF9gX8hF5y',
        database: 'nexp',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        logging: true,
        subscribers: [
          TransactionsToUsersSubscriber,
        ],
      });

      return dataSource.initialize();
    },
  },
];
