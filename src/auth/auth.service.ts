import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { dbTag } from 'src/config/configuration';
import * as schema from '../drizzle/schema';
import { User } from 'src/drizzle/model';
import { InferInsertModel, eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(dbTag) private drizzleProd: MySql2Database<typeof schema>,
  ) {}
  async create(data: InferInsertModel<typeof schema.users>) {
    try {
      const user = await this.drizzleProd.insert(schema.users).values(data);
      return this.drizzleProd.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, user[0].insertId),
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const users = await this.drizzleProd.query.users.findMany({
      orderBy: (users, { asc }) => [asc(users.name)],
      limit: 10,
    });

    return users;
  }
}
