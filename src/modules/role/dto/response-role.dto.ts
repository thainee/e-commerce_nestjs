import { Expose } from 'class-transformer';

export class ReponseRoleDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
