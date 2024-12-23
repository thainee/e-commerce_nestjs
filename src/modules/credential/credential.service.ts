import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { Credential } from './entities/credential.entity';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    const hashedPassword = await bcrypt.hash(createCredentialDto.password, 10);

    const credential = new Credential();
    Object.assign(credential, {
      ...createCredentialDto,
      password: hashedPassword,
    });

    return this.credentialRepository.save(credential);
  }

  async getByUserId(userId: string): Promise<Credential> {
    const credential = await this.credentialRepository.findOne({
      where: { userId },
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
