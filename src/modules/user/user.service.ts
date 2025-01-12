import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInterface } from './interfaces/create-user.interface';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserData: CreateUserInterface): Promise<User> {
    const role = await this.roleService.getByName(createUserData.role);
    const user = new User();

    Object.assign(user, { ...createUserData, role });

    return this.usersRepository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
