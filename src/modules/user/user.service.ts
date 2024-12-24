import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInterface } from './interfaces/create-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserData: CreateUserInterface): Promise<User> {
    const user = new User();

    Object.assign(user, createUserData);

    return this.usersRepository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
