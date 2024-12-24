import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(10, 255)
  description: string;
}
