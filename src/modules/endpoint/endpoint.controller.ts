import { Body, Controller, Post } from '@nestjs/common';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { EndpointService } from './endpoint.service';

@Controller('endpoints')
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  @Post()
  create(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointService.create(createEndpointDto);
  }
}
