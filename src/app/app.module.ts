import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configService } from '../config/config.service';
import { SessionModule } from 'nestjs-session'
import { IdentitiesModule } from 'src/identity/identities.module';
import { BackofficeModule } from 'src/backoffice/backoffice.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    SessionModule.forRoot({
      session: { secret: configService.getSecret() },
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    IdentitiesModule,
    BackofficeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
