import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IBalanceRes } from './wallet.interfaces';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../../users/auth/jwt.guard';
import { SendCoinsDto } from './wallet.dtos';
import { Transaction } from '../transactions/transaction.entity';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
  ) {
  }

  @Get('balance')
  @UseGuards(JwtAuthGuard)
  async getBalance(@Req() req): Promise<IBalanceRes> {
    const userId = req.user.id as number;
    return {
      userId,
      balance: await this.walletService.getBalance(req.user.id),
    };
  }

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async send(@Body() data: SendCoinsDto, @Req() req): Promise<Transaction> {
    const fromUserId = req.user.id;
    const { toUserId, amount } = data;

    return this.walletService.sendCoins(fromUserId, toUserId, amount);
  }
}
