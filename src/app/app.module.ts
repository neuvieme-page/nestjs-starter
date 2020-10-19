import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configService } from '../config/config.service';

console.log(process.env.DB_USER);
console.log(configService.getTypeOrmConfig());
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
