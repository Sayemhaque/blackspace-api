export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: parseInt(process.env.DATABASE_PORT, 10),
  databaseName: process.env.DATABASE_NAME,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
});

export const systemUserId = 0;
export const dbTag = 'MYSQL';
