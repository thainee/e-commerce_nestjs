import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialService } from '../credential/credential.service';
import { CreateCredentialDto } from '../credential/dto/create-credential.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private credentialService: CredentialService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findByEmail(signUpDto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const createUserDto = plainToInstance(CreateUserDto, signUpDto);
    const user = await this.userService.create(createUserDto);

    const createCredentialDto = plainToInstance(CreateCredentialDto, {
      userId: user.id,
      password: signUpDto.password,
    });
    await this.credentialService.create(createCredentialDto);

    const payload = {
      ...user,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async logIn(logInDto: LogInDto) {
    return 'This action returns all auth';
  }
}
