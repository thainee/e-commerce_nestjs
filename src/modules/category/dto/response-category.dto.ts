import { Expose } from 'class-transformer';

export class ResponseCategoryDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;
}
