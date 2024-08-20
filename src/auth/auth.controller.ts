import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create({ ...createUserDto, updatedBy: 1 });
  }

  @Get('users')
  async findAll() {
    return await this.authService.findAll();
  }
}
