import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    Object.assign(role, createRoleDto);

    return this.roleRepository.save(role);
  }

  getAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { name } });

    if (!role) {
      throw new NotFoundException(`Role ${name} not found`);
    }

    return role;
  }
}
