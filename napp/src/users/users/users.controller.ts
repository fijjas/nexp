import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Get('list')
  async getUsers(): Promise<any> {
    return this.usersService.getAll();
  }

  @Post('signup')
  async signUp(): Promise<any> {

  }

  @Post('signin')
  async signIn(): Promise<any> {

  }
}
