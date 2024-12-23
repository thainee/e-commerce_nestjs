import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCredentialDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
