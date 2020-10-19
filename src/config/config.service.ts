import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private get(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.get(k, true));
    return this;
  }

  public getPort() {
    return this.get('PORT', true);
  }

  public isProduction() {
    const mode = this.get('ENV', false);
    return mode != 'development';
  }

  DB_NAME = 'database';
  DB_USER = 'user';
  DB_PASSWORD = 'example';
  DB_HOST = 'localhost';

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.get('DB_HOST'),
      port: parseInt(this.get('DB_PORT')),
      username: this.get('DB_USER'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_NAME'),
      entities: [
        // '**/*.entity{.ts,.js}'
      ],
      // migrationsTableName: 'migration',
      // migrations: ['src/db/migrations/*.ts'],
      synchronize: true,
      autoLoadEntities: true,

      cli: {
        migrationsDir: 'src/db/migration',
      },

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
]);

export { configService };
