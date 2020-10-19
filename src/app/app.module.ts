import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configService } from '../config/config.service';
import { SessionModule } from 'nestjs-session'
import { IdentitiesModule } from 'src/identity/identities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SessionModule.forRoot({
      session: { secret: configService.getSecret() },
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    IdentitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
