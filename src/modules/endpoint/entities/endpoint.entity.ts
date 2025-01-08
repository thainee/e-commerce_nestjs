import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HttpMethod } from '../types/http-method.type';
import { Permission } from 'src/modules/permission/entities/permission.entity';

@Entity('endpoints')
export class Endpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  method: HttpMethod;

  @OneToMany(() => Permission, (permission) => permission.endpoint)
  permissions: Permission[];
}
