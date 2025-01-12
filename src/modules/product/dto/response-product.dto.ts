import { Expose, Transform } from 'class-transformer';

export class ResponseProductDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  offerPrice: number;

  @Expose()
  shortDescription: string;

  @Expose()
  longDescription: string;

  @Expose()
  quantity: number;

  @Expose()
  slug: string;

  @Expose()
  categoryId: string;

  @Expose()
  @Transform(({ obj }) => obj.category?.name)
  category: string;
}
