import { Module } from '@nestjs/common';
import { CredentialModule } from '../credential/credential.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, CredentialModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
