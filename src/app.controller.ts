import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

export type Users = {
  id: number;
  name: string;
  age: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getSayHi() {
    return this.appService.getSayHi();
  }
}
