import { relations } from 'drizzle-orm';
import {
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
  updatedBy: int('updated_by'),
});

export const courses = mysqlTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  price: int('price').notNull(),
  discount: int('discount'),
  image: varchar('image', { length: 255 }),
  categoryId: int('category_id', { unsigned: true })
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

export const coursesRelations = relations(courses, ({ one }) => ({
  category: one(categories, {
    fields: [courses.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(courses, ({ many }) => ({
  courses: many(courses),
}));
