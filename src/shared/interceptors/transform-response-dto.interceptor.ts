import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class TransformResponseDtoInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: ClassConstructor<T>) {}

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response: ApiResponse<T>) => {
        return {
          ...response,
          data: plainToInstance(this.dtoClass, response.data, {
            excludeExtraneousValues: true,
          }),
        };
      }),
    );
  }
}
