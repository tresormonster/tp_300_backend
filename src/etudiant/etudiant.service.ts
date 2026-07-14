import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Etudiant } from './entities/etudiant.entity';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';

import { PasswordService } from '../security/password.service';

@Injectable()
export class EtudiantService {

  constructor(

    @InjectRepository(Etudiant)
    private etudiantRepo: Repository<Etudiant>,
  ) {}

  // 🔥 CREATE
  async create(dto: CreateEtudiantDto) {

    // 🔥 HASH PASSWORD
    const hashedPassword =
        await PasswordService.hash(
          dto.mot_de_passe,
        );

    // 🔥 CREATE ETUDIANT
    const etudiant =
        this.etudiantRepo.create({

      matricule: dto.matricule,

      nom: dto.nom,

      prenom: dto.prenom,

      date_naissance:
          dto.date_naissance,

      lieu_naissance:
          dto.lieu_naissance,

      email: dto.email,

      // 🔥 PASSWORD CRYPTÉ
      mot_de_passe:
          hashedPassword,

      // 🔥 RELATION NIVEAU
      niveau: {
        id_niveau:
            dto.id_niveau,
      } as any,
    });

    return this.etudiantRepo.save(
      etudiant,
    );
  }

  // 🔥 GET ALL
  findAll() {

    return this.etudiantRepo.find({

      relations: ['niveau'],
    });
  }

  // 🔥 GET ONE
  findOne(id: number) {

    return this.etudiantRepo.findOne({

      where: {
        id_etudiant: id,
      },

      relations: ['niveau'],
    });
  }

  // 🔥 UPDATE
  async update(
    id: number,
    dto: any,
  ) {

    await this.etudiantRepo.update(
      id,
      dto,
    );

    return this.findOne(id);
  }

  // 🔥 DELETE
  remove(id: number) {

    return this.etudiantRepo.delete(id);
  }




  async activation(
  dto: any,
) {

  const matricule =
    dto.matricule
        .trim()
        .toUpperCase();

const etudiant =
    await this.etudiantRepo.findOne({

  where: {
    matricule: matricule,
  },
});

  if (!etudiant) {

    return {
      success: false,
      message:
        'Matricule introuvable',
    };
  }

  if (etudiant.compte_active) {

    return {
      success: false,
      message:
        'Compte déjà activé',
    };
  }

  const emailExiste =
      await this.etudiantRepo.findOne({

    where: {
      email: dto.email,
    },
  });

  if (emailExiste) {

    return {
      success: false,
      message:
        'Email déjà utilisé',
    };
  }

  etudiant.email = dto.email;

  etudiant.mot_de_passe =
    await PasswordService.hash(
      dto.mot_de_passe,
    );

  etudiant.compte_active = true;

  await this.etudiantRepo.save(
    etudiant,
  );

  return {
    success: true,
    message:
      'Compte activé',
  };
}
}