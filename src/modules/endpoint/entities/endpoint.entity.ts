import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HttpMethod } from '../types/http-method.type';

@Entity('endpoints')
export class Endpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  method: HttpMethod;
}
