import {
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  email: varchar('email', { length: 50 }).unique(),
  on: varchar('designation', { length: 255 }),
  lastVisitedAt: timestamp('last_visited_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', fsp: 3 }).$onUpdate(
    () => new Date(),
  ),
  createdAt: timestamp('created_at', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedBy: int('updated_by').notNull(),
});
