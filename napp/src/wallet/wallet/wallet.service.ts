import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TrType } from '../transactions/transactions.interfaces';
import { Transaction } from '../transactions/transaction.entity';
import { WalletError } from './wallet.constants';

@Injectable()
export class WalletService {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {
  }

  async getBalance(userId: number): Promise<number> {
    const [debit, credit] = await Promise.all([
      this.transactionsService.sumByUserId(userId, TrType.DEBIT),
      this.transactionsService.sumByUserId(userId, TrType.CREDIT),
    ]);
    return debit - credit;
  }

  async sendCoins(fromUserId: number, toUserId: number, amount: number): Promise<Transaction> {
    // todo: run this in a transaction
    const balance = await this.getBalance(fromUserId);
    if (balance < amount) {
      throw new BadRequestException(WalletError.INSUFFICIENT_BALANCE);
    }
    return this.transactionsService.createOne({ fromUserId, toUserId, amount });
  }
}
