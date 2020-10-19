import { IsEmail, IsNotEmpty } from 'class-validator';

export class LocalSigninDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
