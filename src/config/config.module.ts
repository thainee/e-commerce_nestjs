import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './database-config.module';
import { JwtConfigModule } from './jwt-config.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseConfigModule,
    JwtConfigModule,
  ],
})
export class ConfigModule {}
