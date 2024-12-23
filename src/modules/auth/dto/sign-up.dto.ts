import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CapitalizeFirstLetter } from 'src/shared/decorators/capitalize-first-letter.decorator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @CapitalizeFirstLetter()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @CapitalizeFirstLetter()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
