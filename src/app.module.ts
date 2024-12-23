import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { CredentialModule } from './modules/credential/credential.module';
import { UserModule } from './modules/user/user.module';
import { TrimMiddleware } from './shared/middlewares/trim.middleware';

@Module({
  imports: [ConfigModule, UserModule, CredentialModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrimMiddleware).forRoutes('*');
  }
}
