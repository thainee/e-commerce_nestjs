import { INestApplication, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getAllRoutes } from './get-all-routes.util';
import { Endpoint } from 'src/modules/endpoint/entities/endpoint.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';

export async function synchronizeEndpointsPermissions(app: INestApplication) {
  const logger = new Logger('synchronizeEndpointsPermissions');
  const dataSource = app.get(DataSource);
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  const endpoints = getAllRoutes(app);

  try {
    await queryRunner.manager.query('TRUNCATE TABLE endpoints CASCADE');
    logger.log('Endpoints table truncated');
    await queryRunner.manager.query('TRUNCATE TABLE permissions CASCADE');
    logger.log('Permissions table truncated');

    const roles = await queryRunner.manager.find(Role);

    await Promise.all(
      endpoints.map(async (endpoint) => {
        const newEndpoint = new Endpoint();
        Object.assign(newEndpoint, endpoint);
        const savedEndpoint = await queryRunner.manager.save(newEndpoint);

        await Promise.all(
          roles.map(async (role) => {
            const permission = new Permission();
            permission.endpoint = savedEndpoint;
            permission.role = role;
            permission.isAllow = role.name === 'admin';
            return queryRunner.manager.save(permission);
          }),
        );
      }),
    );
    logger.log('Endpoints and permissions synchronized');

    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
