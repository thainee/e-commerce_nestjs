import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const accessToken = await this.authService.signUp(signUpDto);

    return {
      message: 'Sign up successful',
      accessToken,
    };
  }

  @Post()
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }
}
