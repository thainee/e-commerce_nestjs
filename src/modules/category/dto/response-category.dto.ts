import { Expose, Type } from 'class-transformer';
import { Category } from '../entities/category.entity';

export class ResponseCategoryDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => ResponseCategoryDto)
  childrenCategories: Category[];
}
