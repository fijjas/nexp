import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersSearchDto } from './users.dtos';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async search(@Query() { keyword }: UsersSearchDto): Promise<any> {
    return this.usersService.search(keyword);
  }
}
