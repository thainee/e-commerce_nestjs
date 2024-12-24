import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const NonEmptyBody = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }

    return body;
  },
);
