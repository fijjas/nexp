import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';
import { GetTransactionsDto } from './transactions.dtos';
import { JwtAuthGuard } from '../../users/auth/jwt.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async getTransactions(@Req() req, @Query() query: GetTransactionsDto): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(query, req.user);
  }
}
