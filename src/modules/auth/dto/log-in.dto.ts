import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LogInDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  password: string;
}
