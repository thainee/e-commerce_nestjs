import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { CredentialService } from '../credential/credential.service';
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
    private readonly dataSource: DataSource,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findByEmail(signUpDto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.create(signUpDto);

      await this.credentialService.create({
        user,
        password: signUpDto.password,
      });

      await queryRunner.commitTransaction();

      return this.generateToken(user);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to complete sign-up');
    } finally {
      await queryRunner.release();
    }
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
