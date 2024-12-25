import { INestApplication } from '@nestjs/common';
import { Router } from 'express';
import { CreateEndpoint } from 'src/modules/endpoint/types/create-endpoint.type';

export function getAllRoutes(app: INestApplication): CreateEndpoint[] {
  const server = app.getHttpServer();
  const router: Router = server._events.request._router;

  const availableRoutes: CreateEndpoint[] = [];

  router.stack.forEach((layer: any) => {
    if (layer.route) {
      const path = layer.route?.path;

      const method = Object.keys(layer.route.methods)[0].toUpperCase();
      availableRoutes.push({ path, method });
    }
  });

  return availableRoutes;
}
