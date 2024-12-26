import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

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
    return this.roleRepository.find({ where: { isActive: true } });
  }

  getById(id: string): Promise<Role> {
    const role = this.roleRepository.findOne({
      where: { id },
      relations: { users: true },
    });

    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    return role;
  }

  async getByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ name });

    if (!role) {
      throw new NotFoundException(`Role ${name} not found`);
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.getById(id);

    Object.assign(role, updateRoleDto);

    return this.roleRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.getById(id);

    if (role.users.length) {
      throw new BadRequestException('Role has users');
    }

    role.isActive = false;

    await this.roleRepository.save(role);
  }
}
