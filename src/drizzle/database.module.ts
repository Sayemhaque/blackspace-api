import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { dbTag } from '../config/configuration';
import * as schema from './schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DrizzleMySqlModule.registerAsync({
      tag: dbTag,
      useFactory: (configService: ConfigService) => ({
        mysql: {
          connection: 'pool',
          config: {
            host: configService.get<string>('databaseHost'),
            user: configService.get<string>('databaseUser'),
            password: configService.get<string>('databasePassword'),
            database: configService.get<string>('databaseName'),
          },
        },
        config: { schema: { ...schema }, mode: 'default', logger: true },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
