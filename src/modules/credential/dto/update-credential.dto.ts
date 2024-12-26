import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCredentialDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
