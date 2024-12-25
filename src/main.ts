import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import { EndpointService } from './modules/endpoint/endpoint.service';
import { getAllRoutes } from './shared/utils/get-all-routes.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  await app.init();

  const endpointService = app.get(EndpointService);
  const routes = getAllRoutes(app);

  await endpointService.synchronizeEndpoints(routes);

  await app.listen(config.port);
}
bootstrap();
