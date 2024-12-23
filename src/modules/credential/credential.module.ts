import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialService } from './credential.service';
import { Credential } from './entities/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}
