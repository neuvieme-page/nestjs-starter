import { Injectable } from '@nestjs/common';

const env = process.env;

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify(env.DB_USER);
  }
}
