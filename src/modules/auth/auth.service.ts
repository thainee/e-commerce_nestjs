import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialService } from '../credential/credential.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

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

    const user = await this.userService.create(signUpDto);

    await this.credentialService.create({
      user,
      password: signUpDto.password,
    });

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
