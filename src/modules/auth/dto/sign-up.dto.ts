import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { CapitalizeFirstLetter } from 'src/shared/decorators/capitalize-first-letter.decorator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @CapitalizeFirstLetter()
  @Length(3, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @CapitalizeFirstLetter()
  @Length(3, 50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  role: string;
}
