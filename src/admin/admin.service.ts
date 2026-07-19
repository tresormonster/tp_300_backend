import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService implements OnModuleInit {

  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async onModuleInit() {
    await this.creerPremierAdmin();
  }

  private async creerPremierAdmin() {

    const admin = await this.adminRepo.findOne({
      where: {
        email: 'admin@admin.com',
      },
    });

    if (admin) {
      console.log('✔ Administrateur déjà existant');
      return;
    }

    const hash = await bcrypt.hash(
      'admin123',
      10,
    );

    const nouvelAdmin = this.adminRepo.create({
      nom: 'Admin',
      prenom: 'Système',
      email: 'admin@admin.com',
      mot_de_passe: hash,
    });

    await this.adminRepo.save(nouvelAdmin);

    console.log(
      '✅ Premier administrateur créé',
    );
  }

  async findByEmail(email: string) {
    return this.adminRepo.findOne({
      where: { email },
    });
  }
}