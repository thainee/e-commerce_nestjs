import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './config/database-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, DatabaseConfigModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
