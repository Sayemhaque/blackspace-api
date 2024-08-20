import {
  boolean,
  char,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  email: varchar('email', { length: 50 }).unique(),
  phone: char('phone', { length: 15 }).unique(),
  age: smallint('age'),
  gender: char('gender', { length: 1 }),
  occupation: varchar('occupation', { length: 100 }),
  password: char('password', { length: 60 }),
  salt: char('salt', { length: 32 }),
  isEmailVerified: boolean('is_email_verified').default(false),
  isPhoneVerified: boolean('is_phone_verified').default(false),
  registeredUsing: mysqlEnum('registered_using', ['EMAIL', 'PHONE']),
  picture: varchar('picture', { length: 255 }),
  designation: varchar('designation', { length: 255 }),
  bio: text('bio'),
  countryCode: char('country_code', { length: 2 }),
  dialCode: char('dial_code', { length: 5 }),
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
