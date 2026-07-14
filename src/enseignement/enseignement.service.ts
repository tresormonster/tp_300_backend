import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enseignement } from './entities/enseignement.entity';
import { CreateEnseignementDto } from './dto/create-enseignement.dto';
import { UpdateEnseignementDto } from './dto/update-enseignement.dto';

@Injectable()
export class EnseignementService {

  constructor(
    @InjectRepository(Enseignement)
    private ensRepo: Repository<Enseignement>,
  ) {}

  // ➕ CREATE
  async create(dto: CreateEnseignementDto) {

  const existe =
    await this.ensRepo.findOne({

      where: {

        annee_academique:
          dto.annee_academique,

        enseignant: {
          id_enseignant:
            dto.id_enseignant,
        },

        ue: {
          id_ue:
            dto.id_ue,
        },
      },

      relations: [
        'enseignant',
        'ue',
      ],
    });

  if (existe) {

    return {
      message:
        'Cet enseignement existe déjà',
    };
  }

  const ens =
    this.ensRepo.create({

      annee_academique:
        dto.annee_academique,

      enseignant: {
        id_enseignant:
          dto.id_enseignant,
      },

      ue: {
        id_ue:
          dto.id_ue,
      },
    });

  return this.ensRepo.save(ens);
}

  // 📥 GET ALL
  findAll() {
    return this.ensRepo.find({
      relations: ['enseignant', 'ue'],
    });
  }

  // 📥 GET ONE
  findOne(id: number) {
    return this.ensRepo.findOne({
      where: { id_enseignement: id },
      relations: ['enseignant', 'ue'],
    });
  }

  // ✏️ UPDATE
 async update(
  id: number,
  dto: UpdateEnseignementDto,
) {

  const enseignement =
    await this.ensRepo.findOne({

      where: {
        id_enseignement: id,
      },
    });

  if (!enseignement) {

    return {
      message:
        'Enseignement introuvable',
    };
  }

  const doublon =
    await this.ensRepo.findOne({

      where: {

        annee_academique:
          dto.annee_academique,

        enseignant: {
          id_enseignant:
            dto.id_enseignant,
        },

        ue: {
          id_ue:
            dto.id_ue,
        },
      },

      relations: [
        'enseignant',
        'ue',
      ],
    });

  if (
    doublon &&
    doublon.id_enseignement !== id
  ) {

    return {

      message:
        'Cet enseignement existe déjà',
    };
  }

  enseignement.annee_academique =
    dto.annee_academique!;

  enseignement.enseignant = {

    id_enseignant:
      dto.id_enseignant!,

  } as any;

  enseignement.ue = {

    id_ue:
      dto.id_ue!,

  } as any;

  return this.ensRepo.save(
    enseignement,
  );
}
  // ❌ DELETE
  remove(id: number) {
    return this.ensRepo.delete(id);
  }





 async uesEnseignant(
  idEnseignant: number,
) {

  const enseignements =
      await this.ensRepo.find({

    where: {

      enseignant: {

        id_enseignant:
            idEnseignant,
      },
    },

    relations: [

      'ue',

      'ue.niveau',

      'ue.niveau.filiere',
    ],
  });

  return enseignements.map(

    (e) => ({

      id_ue:
          e.ue.id_ue,

      code_ue:
          e.ue.code_ue,

      nom_ue:
          e.ue.nom_ue,

      credit:
          e.ue.credit,

      has_tp:
          e.ue.has_tp,

      semestre:
          e.ue.semestre,

      id_niveau:
          e.ue.niveau.id_niveau,

      nom_niveau:
          e.ue.niveau.nom_niveau,

      id_filiere:
          e.ue.niveau.filiere.id_filiere,

      nom_filiere:
          e.ue.niveau.filiere.nom_filiere,
    }),
  );
}
}