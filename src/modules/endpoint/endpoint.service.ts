import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { Endpoint } from './entities/endpoint.entity';
import { getAllRoutes } from 'src/shared/utils/get-all-routes.util';

@Injectable()
export class EndpointService {
  private readonly logger = new Logger(EndpointService.name);

  constructor(
    @InjectRepository(Endpoint)
    private endpointRepository: Repository<Endpoint>,
    private dataSource: DataSource,
  ) {}

  create(createEndpointDto: CreateEndpointDto): Promise<Endpoint> {
    const endpoint = new Endpoint();

    Object.assign(endpoint, createEndpointDto);

    return this.endpointRepository.save(endpoint);
  }

  async synchronizeEndpoints(app: INestApplication): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const endpoints = getAllRoutes(app);

    try {
      await queryRunner.manager.clear(Endpoint);

      endpoints.forEach((endpoint) => {
        const newEndpoint = new Endpoint();
        Object.assign(newEndpoint, endpoint);

        queryRunner.manager.save(newEndpoint);
      });

      await queryRunner.commitTransaction();
      this.logger.log(
        'Cleared and Inserted all routes into the endpoints table successfully.',
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Error while synchronizing endpoints: ', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
