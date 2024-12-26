import { User } from 'src/modules/user/entities/user.entity';

export interface CreateCredentialInterface {
  user: User;
  password: string;
}
