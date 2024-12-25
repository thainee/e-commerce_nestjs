import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from 'src/modules/credential/entities/credential.entity';
import { Endpoint } from 'src/modules/endpoint/entities/endpoint.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Credential, Role, Endpoint],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
