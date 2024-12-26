import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { TransformResponseDtoInterceptor } from '../interceptors/transform-response-dto.interceptor';

export function TransformResponseDto<T>(dto: ClassConstructor<T>) {
  return applyDecorators(
    UseInterceptors(new TransformResponseDtoInterceptor(dto)),
  );
}
