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

  @Post('/login')
  async logIn(@Body() logInDto: LogInDto) {
    const accessToken = await this.authService.logIn(logInDto);

    return {
      message: 'Log in successful',
      accessToken,
    };
  }
}
