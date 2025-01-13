import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class TransformResponseDtoInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: ClassConstructor<T>) {}

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response) => {
        if (!response.data) {
          return response;
        }

        // paginate
        if (response.data.data) {
          return {
            ...response,
            ...response.data,
            data: plainToInstance(this.dtoClass, response.data.data, {
              excludeExtraneousValues: true,
            }),
          };
        }

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
