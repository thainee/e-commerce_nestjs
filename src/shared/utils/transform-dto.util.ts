import { Logger } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function transformDto<T, V>(
  dto: ClassConstructor<T>,
  data: V,
  logger: Logger,
): T {
  const transformedData = plainToInstance(dto, data);

  const errors = validateSync(transformedData as object);

  if (errors.length > 0) {
    const errorMessages = errors.flatMap((error) =>
      Object.values(error.constraints || {}),
    );
    const formattedErrors = {
      error: 'Transform DTO',
      dto: dto.name,
      messages: errorMessages,
    };
    logger.error(formattedErrors);
  }

  return transformedData;
}
