import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { CredentialService } from '../credential/credential.service';
import { CreateCredentialDto } from '../credential/dto/create-credential.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../user/entities/user.entity';

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

    return this.generateToken(user);
  }

  async logIn(logInDto: LogInDto) {
    const user = await this.userService.findByEmail(logInDto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const credential = await this.credentialService.getByUserId(user.id);

    const isPasswordMatch = await this.credentialService.comparePassword(
      logInDto.password,
      credential.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): Promise<string> {
    const payload = { ...user };
    return this.jwtService.signAsync(payload);
  }
}
