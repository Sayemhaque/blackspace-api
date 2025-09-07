import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSayHi() {
    return 'server is walking';
  }
}
