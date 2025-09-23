import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { Category } from 'src/drizzle/model';
import { ColumnSelection, SelectedColumns } from 'test/utils/type';
import * as schema from '../../drizzle/schema';
import { dbTag } from 'src/config/configuration';

@Injectable()
export class CategoryService {
  @Inject(dbTag) private database: MySql2Database<typeof schema>;

  async create(data: InferInsertModel<typeof schema.categories>) {
    const category = await this.database.insert(schema.categories).values(data);

    return this.findById(category[0].insertId, { all: true });
  }

  async findAll<C extends ColumnSelection<Category>>(columns?: C) {
    const categories = await this.database.query.categories.findMany({
      ...(!columns?.all && {
        columns: {
          id: true,
          ...(columns || {}),
        },
      }),
    });

    return categories as C extends { all: true }
      ? Category[]
      : (SelectedColumns<Category, C> & Pick<Category, 'id'>)[];
  }

  async findById<C extends ColumnSelection<Category>>(id: number, columns?: C) {
    const category = await this.findOne(
      {
        id,
      },
      columns,
    );

    return category as C extends { all: true }
      ? Category
      : SelectedColumns<Category, C> & Pick<Category, 'id'>;
  }

  async findOne<C extends ColumnSelection<Category>>(
    where: Partial<InferSelectModel<typeof schema.categories>>,
    columns?: C,
  ): Promise<
    C extends { all: true }
      ? Category
      : SelectedColumns<Category, C> & Pick<Category, 'id'>
  > {
    const { all, ...rest } = columns || {};

    const category = await this.database.query.categories.findFirst({
      ...(!all && {
        columns: {
          id: true,
          ...rest,
        },
      }),
      where: (categories) => {
        const conditions = [];
        for (const key in where) {
          if (where[key] !== undefined) {
            conditions.push(eq(categories[key], where[key]));
          }
        }

        return and(...conditions);
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category as C extends { all: true }
      ? Category
      : SelectedColumns<Category, C> & Pick<Category, 'id'>;
  }
}
