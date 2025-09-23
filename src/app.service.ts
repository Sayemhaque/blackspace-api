import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSayHi() {
    return 'Hello world!';
  }
}
