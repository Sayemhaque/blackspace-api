import { Injectable } from '@nestjs/common';
import { Users } from './app.controller';

@Injectable()
export class AppService {
  getSayHi() {
    return 'server is walking';
  }
}
