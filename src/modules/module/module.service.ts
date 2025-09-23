import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { dbTag } from 'src/config/configuration';
import { Module } from 'src/drizzle/model';
import { ColumnSelection, SelectedColumns } from 'test/utils/type';
import * as schema from '../../drizzle/schema';

@Injectable()
export class CourseModuleService {
  @Inject(dbTag) private database: MySql2Database<typeof schema>;

  async create(data: InferInsertModel<typeof schema.modules>) {
    const module = await this.database.insert(schema.modules).values(data);

    return this.findById(module[0].insertId, { all: true });
  }

  async createMany(data: InferInsertModel<typeof schema.modules>[]) {
    const inserted = await this.database.insert(schema.modules).values(data);

    // inserted[0].insertId is the ID of the first row in the batch
    const firstId = inserted[0].insertId;
    const lastId = firstId + data.length - 1;

    const modules = await this.database.query.modules.findMany({
      where: (modules, { gte, lte }) =>
        and(gte(modules.id, firstId), lte(modules.id, lastId)),
    });

    return modules;
  }

  async findAll<C extends ColumnSelection<Module>>(columns?: C) {
    const modules = await this.database.query.modules.findMany({
      ...(!columns?.all && {
        columns: {
          id: true,
          ...(columns || {}),
        },
      }),
    });

    return modules as C extends { all: true }
      ? Module[]
      : (SelectedColumns<Module, C> & Pick<Module, 'id'>)[];
  }

  async findById<C extends ColumnSelection<Module>>(id: number, columns?: C) {
    const module = await this.findOne(
      {
        id,
      },
      columns,
    );

    return module as C extends { all: true }
      ? Module
      : SelectedColumns<Module, C> & Pick<Module, 'id'>;
  }

  async findOne<C extends ColumnSelection<Module>>(
    where: Partial<InferSelectModel<typeof schema.modules>>,
    columns?: C,
  ): Promise<
    C extends { all: true }
      ? Module
      : SelectedColumns<Module, C> & Pick<Module, 'id'>
  > {
    const { all, ...rest } = columns || {};

    const modules = await this.database.query.modules.findFirst({
      ...(!all && {
        columns: {
          id: true,
          ...rest,
        },
      }),
      where: (modules) => {
        const conditions = [];
        for (const key in where) {
          if (where[key] !== undefined) {
            conditions.push(eq(modules[key], where[key]));
          }
        }

        return and(...conditions);
      },
    });

    if (!modules) {
      throw new NotFoundException('Module not found');
    }

    return modules as C extends { all: true }
      ? Module
      : SelectedColumns<Module, C> & Pick<Module, 'id'>;
  }
}
