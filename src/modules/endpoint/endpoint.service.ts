import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endpoint } from './entities/endpoint.entity';

@Injectable()
export class EndpointService {
  constructor(
    @InjectRepository(Endpoint)
    private endpointRepository: Repository<Endpoint>,
  ) {}
}
