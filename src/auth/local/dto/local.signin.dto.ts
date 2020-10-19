import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LocalSigninDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
