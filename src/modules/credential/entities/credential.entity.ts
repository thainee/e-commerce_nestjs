import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('credentials')
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ default: true })
  isActive: boolean;
}
