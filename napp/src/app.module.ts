import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { WalletModule } from './wallet/wallet.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    WalletModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
