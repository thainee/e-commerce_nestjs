import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { LogInDto } from './dto/log-in.dto';

@Injectable()
export class AuthService {
  async signUp(signUpDto: SignUpDto) {
    return 'This action adds a new auth';
  }

  async logIn(logInDto: LogInDto) {
    return 'This action returns all auth';
  }
}
