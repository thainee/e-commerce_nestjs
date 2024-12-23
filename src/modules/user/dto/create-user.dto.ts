import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CapitalizeFirstLetter } from 'src/shared/decorators/capitalize-first-letter.decorator';

export class CreateUserDto {
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
}
