import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { dbTag } from 'src/config/configuration';
import * as schema from '../drizzle/schema';
import { User } from 'src/drizzle/model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(dbTag) private drizzleProd: MySql2Database<typeof schema>,
  ) {}
  async create(data) {
    return 
  }
}
