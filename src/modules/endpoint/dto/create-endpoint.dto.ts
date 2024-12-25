import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { HTTP_METHODS, HttpMethod } from '../types/http-method.type';

export class CreateEndpointDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsIn(HTTP_METHODS)
  @IsNotEmpty()
  method: HttpMethod;
}
