import { Module } from '@nestjs/common';
import { JwtConfigModule } from 'src/config/jwt-config.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
