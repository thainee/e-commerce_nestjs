import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Endpoint } from 'src/modules/endpoint/entities/endpoint.entity';
import { Role } from 'src/modules/role/entities/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryColumn()
  roleId: string;

  @PrimaryColumn()
  endpointId: string;

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;

  @ManyToOne(() => Endpoint, (endpoint) => endpoint.permissions)
  endpoint: Endpoint;

  @Column({ default: false })
  isAllow: boolean;
}
