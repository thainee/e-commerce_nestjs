import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { Credential } from './entities/credential.entity';
import { CreateCredentialInterface } from './interfaces/create-credential.interface';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  async create(credentialData: CreateCredentialInterface): Promise<Credential> {
    const hashedPassword = await bcrypt.hash(credentialData.password, 10);

    const credential = new Credential();
    Object.assign(credential, {
      ...credentialData,
      password: hashedPassword,
    });

    return this.credentialRepository.save(credential);
  }

  async getByUserId(userId: string): Promise<Credential> {
    const credential = await this.credentialRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!credential) {
      throw new NotFoundException('Credential not found');
    }
    return credential;
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async updatePassword(
    userId: string,
    updateCredentialDto: UpdateCredentialDto,
  ): Promise<Credential> {
    const credential = await this.getByUserId(userId);
    const hashedPassword = await bcrypt.hash(updateCredentialDto.password, 10);
    credential.password = hashedPassword;
    return this.credentialRepository.save(credential);
  }
}
