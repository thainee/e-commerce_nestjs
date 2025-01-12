import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  offerPrice: number;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsOptional()
  @IsString()
  longDescription: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
