import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TRANSACTIONS_REPOSITORY } from './transactions.constants';
import { TrType } from './transactions.interfaces';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY) private readonly transactionsRepo: Repository<Transaction>,
  ) {
  }

  // todo: types, figure out how to pass params from request to query builder
  async getTransactions(query: any, user: any): Promise<Transaction[]> {
    const userId = user.id;
    const tableName: string = this.transactionsRepo.metadata.tableName;
    const col = (columnName: string): string => `${tableName}.${columnName}`;

    return this.transactionsRepo.createQueryBuilder(tableName)
      .select(['id', 'fromUserId', 'toUserId', 'amount', 'createdAt'].map(c => `${col(c)}`).join(', '))
      .where(`${col('toUserId')} = :userId`, { userId })
      .orWhere(`${col('fromUserId')} = :userId`, { userId })
      .orderBy(`${col('createdAt')}`, 'DESC')
      // .leftJoinAndSelect('user.fromUser', 'user', 'user.id = transaction.fromUserId') // fixme
      // .leftJoinAndSelect('user.toUser', 'user', 'user.id = transaction.toUserId')
      .getRawMany();
  }

  async createOne(data: DeepPartial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionsRepo.create(data);

    return this.transactionsRepo.save(transaction);
  }

  async sumByUserId(userId: number, trType: TrType): Promise<number> {
    const tableName: string = this.transactionsRepo.metadata.tableName;
    const userFk: keyof Transaction = trType === TrType.DEBIT ? 'toUserId' : 'fromUserId';
    const col = (columnName: string): string => `${tableName}.${columnName}`;

    return this.transactionsRepo.createQueryBuilder(tableName)
      .select(`SUM(${col('amount')})`, 's')
      .where(`${col(userFk)} = :userId`, { userId })
      .groupBy(col(userFk))
      .getRawOne<{ s: number }>()
      .then(r => +r?.s || 0);
  }
}
