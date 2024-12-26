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
      map((data) =>
        plainToInstance(this.dtoClass, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
