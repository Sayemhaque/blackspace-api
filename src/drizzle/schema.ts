import { relations } from 'drizzle-orm';
import {
  bigint,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  name: varchar('name', { length: 100 }),
  designation: varchar('designation', { length: 255 }),
  lastVisitedAt: timestamp('last_visited_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', fsp: 3 }).$onUpdate(
    () => new Date(),
  ),
  createdAt: timestamp('created_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedBy: bigint('updated_by', { mode: 'number' }),
});

export const courses = mysqlTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  price: int('price').notNull(),
  discount: int('discount'),
  image: varchar('image', { length: 255 }),
  categoryId: bigint('category_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => categories.id),
  createdAt: timestamp('created_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', fsp: 3 }).$onUpdate(
    () => new Date(),
  ),
});

export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', fsp: 3 }).$onUpdate(
    () => new Date(),
  ),
});

export const modules = mysqlTable('modules', {
  id: serial('id').primaryKey(),
  courseId: bigint('course_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => courses.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  sequence: int('sequence').notNull(),
  createdAt: timestamp('created_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', fsp: 3 }).$onUpdate(
    () => new Date(),
  ),
});

export const lessons = mysqlTable('lessons', {
  id: serial('id').primaryKey(),
  moduleId: bigint('module_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => modules.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  sequence: int('sequence').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  url: varchar('video_url', { length: 255 }),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', fsp: 3 }).$onUpdate(
    () => new Date(),
  ),
});

export const coursesRelations = relations(courses, ({ one }) => ({
  category: one(categories, {
    fields: [courses.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(courses, ({ many }) => ({
  courses: many(courses),
}));
