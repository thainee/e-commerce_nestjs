import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';

export class LogInDto extends PartialType(SignUpDto) {}
