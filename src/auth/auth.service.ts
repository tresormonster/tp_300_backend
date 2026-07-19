import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository }
from '@nestjs/typeorm';

import { Repository }
from 'typeorm';

import * as bcrypt
from 'bcrypt';

import { JwtService }
from '@nestjs/jwt';

import { Etudiant }
from '../etudiant/entities/etudiant.entity';

import { LoginDto }
from './dto/login.dto';

import { Enseignant }
from '../enseignant/entities/enseignant.entity';


import { Admin }
from '../admin/entities/admin.entity';
@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(Etudiant)

    private etudiantRepo:
        Repository<Etudiant>,

    private jwtService:
        JwtService,

        @InjectRepository(Enseignant)

private enseignantRepo:
    Repository<Enseignant>,
    @InjectRepository(Admin)
private adminRepo: Repository<Admin>,
  ) {}

  // 🔥 LOGIN
 async login(
  dto: LoginDto,
) {

  // ===== ETUDIANT =====

  const etudiant =
      await this.etudiantRepo.findOne({

    where: {
      email: dto.email,
    },
  });

  if (etudiant) {

    if (!etudiant.mot_de_passe) {

      throw new UnauthorizedException(
        'Compte non activé',
      );
    }

    const ok =
        await bcrypt.compare(

      dto.mot_de_passe,

      etudiant.mot_de_passe,
    );

    if (ok) {

      const payload = {

        id:
            etudiant.id_etudiant,

        email:
            etudiant.email,

        role:
            'ETUDIANT',
      };

      return {

        access_token:

            this.jwtService.sign(
              payload,
            ),

        role:
            'ETUDIANT',

        id:
            etudiant.id_etudiant,
      };
    }
  }

  // ===== ENSEIGNANT =====

  const enseignant =
      await this.enseignantRepo.findOne({

    where: {
      email: dto.email,
    },
  });

  if (enseignant) {

    const ok =
        await bcrypt.compare(

      dto.mot_de_passe,

      enseignant.mot_de_passe,
    );

    if (ok) {

      const payload = {

        id:
            enseignant.id_enseignant,

        email:
            enseignant.email,

        role:
            'ENSEIGNANT',
      };

      return {

        access_token:

            this.jwtService.sign(
              payload,
            ),

        role:
            'ENSEIGNANT',

        id:
            enseignant.id_enseignant,
      };
    }
  }

  // ===== ADMIN =====

const admin = await this.adminRepo.findOne({

  where: {
    email: dto.email,
  },
});

if (admin) {

  const ok = await bcrypt.compare(

    dto.mot_de_passe,

    admin.mot_de_passe,
  );

  if (ok) {

    const payload = {

      id: admin.id_admin,

      email: admin.email,

      role: 'ADMIN',
    };

    return {

      access_token:
        this.jwtService.sign(payload),

      role: 'ADMIN',

      id: admin.id_admin,
    };
  }
}

  throw new UnauthorizedException(
    'Email ou mot de passe incorrect',
  );
}
}