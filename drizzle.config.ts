import { defineConfig } from 'drizzle-kit';

const databaseHost = process.env.DATABASE_HOST;
const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  dialect: 'mysql',
  verbose: true,
  strict: true,
  dbCredentials: {
    host: databaseHost,
    user: databaseUser,
    password: databasePassword,
    database: databaseName,
  },
});
