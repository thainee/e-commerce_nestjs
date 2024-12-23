import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { transformDto } from 'src/shared/utils/transform-dto.util';
import { CredentialService } from '../credential/credential.service';
import { CreateCredentialDto } from '../credential/dto/create-credential.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

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

    const createUserDto = transformDto(CreateUserDto, signUpDto, this.logger);
    const user = await this.userService.create(createUserDto);

    const createCredentialDto = transformDto(
      CreateCredentialDto,
      {
        userId: user.id,
        password: signUpDto.password,
      },
      this.logger,
    );
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
