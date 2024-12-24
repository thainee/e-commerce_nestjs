import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { TransformResponseDto } from 'src/shared/decorators/transform-response-dto.decorator';
import { ReponseRoleDto } from './dto/response-role.dto';

@Controller('roles')
@TransformResponseDto(ReponseRoleDto)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  getAll() {
    return this.roleService.getAll();
  }
}
