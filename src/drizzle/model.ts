import { InferSelectModel } from 'drizzle-orm';
import * as schema from './schema';

export type User = InferSelectModel<typeof schema.users>;
export type Course = InferSelectModel<typeof schema.courses>;
export type Category = InferSelectModel<typeof schema.categories>;
