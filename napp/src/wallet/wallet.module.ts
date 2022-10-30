import { Module } from '@nestjs/common';
import { WalletService } from './wallet/wallet.service';
import { TransactionsService } from './transactions/transactions.service';
import { transactionsProviders } from './transactions/transactions.providers';
import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';
import { WalletController } from './wallet/wallet.controller';
import { TransactionsController } from './transactions/transactions.controller';

@Module({
  imports: [
    DbModule,
    UsersModule,
  ],
  providers: [
    TransactionsService,
    WalletService,
    ...transactionsProviders,
  ],
  controllers: [
    WalletController,
    TransactionsController,
  ],
})
export class WalletModule {}
