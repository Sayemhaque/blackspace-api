import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { dbTag } from 'src/config/configuration';
import { Course } from 'src/drizzle/model';
import { ColumnSelection, SelectedColumns } from 'test/utils/type';
import * as schema from '../../drizzle/schema';

@Injectable()
export class CourseService {
  @Inject(dbTag) private database: MySql2Database<typeof schema>;
  async create(data: InferInsertModel<typeof schema.courses>) {
    const course = await this.database.insert(schema.courses).values(data);

    return this.findById(course[0].insertId, { all: true });
  }

  async findAll<C extends ColumnSelection<Course>>(columns?: C) {
    const courses = await this.database.query.courses.findMany({
      ...(!columns?.all && {
        columns: {
          id: true,
          ...(columns || {}),
        },
      }),
    });

    return courses as C extends { all: true }
      ? Course[]
      : (SelectedColumns<Course, C> & Pick<Course, 'id'>)[];
  }

  async findById<C extends ColumnSelection<Course>>(id: number, columns?: C) {
    const course = await this.findOne(
      {
        id,
      },
      columns,
    );

    return course as C extends { all: true }
      ? Course
      : SelectedColumns<Course, C> & Pick<Course, 'id'>;
  }

  async findOne<C extends ColumnSelection<Course>>(
    where: Partial<InferSelectModel<typeof schema.courses>>,
    columns?: C,
  ): Promise<
    C extends { all: true }
      ? Course
      : SelectedColumns<Course, C> & Pick<Course, 'id'>
  > {
    const { all, ...rest } = columns || {};

    const course = await this.database.query.courses.findFirst({
      ...(!all && {
        columns: {
          id: true,
          ...rest,
        },
      }),
      where: (courses) => {
        const conditions = [];
        for (const key in where) {
          if (where[key] !== undefined) {
            conditions.push(eq(courses[key], where[key]));
          }
        }

        return and(...conditions);
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course as C extends { all: true }
      ? Course
      : SelectedColumns<Course, C> & Pick<Course, 'id'>;
  }
}
