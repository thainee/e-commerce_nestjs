import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { CredentialModule } from './modules/credential/credential.module';
import { UserModule } from './modules/user/user.module';
import { TrimMiddleware } from './shared/middlewares/trim.middleware';
import { RoleModule } from './modules/role/role.module';
import { EndpointModule } from './modules/endpoint/endpoint.module';
import { PermissionModule } from './permission/permission.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    CredentialModule,
    AuthModule,
    RoleModule,
    EndpointModule,
    PermissionModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrimMiddleware).forRoutes('*');
  }
}
