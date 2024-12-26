import { Module } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndpointController } from './endpoint.controller';
import { EndpointService } from './endpoint.service';
import { Endpoint } from './entities/endpoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Endpoint])],
  controllers: [EndpointController],
  providers: [EndpointService, MetadataScanner],
})
export class EndpointModule {}
