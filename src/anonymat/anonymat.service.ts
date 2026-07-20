import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Anonymat } from './entities/anonymat.entity';
import { UE } from '../ue/entities/ue.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Note } from '../note/entities/note.entity';

@Injectable()
export class AnonymatService {

  constructor(

    @InjectRepository(Anonymat)
    private anonymatRepository:
      Repository<Anonymat>,

    @InjectRepository(UE)
    private ueRepository:
      Repository<UE>,

    @InjectRepository(Etudiant)
    private etudiantRepository:
      Repository<Etudiant>,

      @InjectRepository(Note)
private noteRepository:
  Repository<Note>,
  ) {}

 

async genererAnonymats(
  idUe: number,
) {
  const ue =
    await this.ueRepository.findOne({
      where: {
        id_ue: idUe,
      },
      relations: [
        'niveau',
      ],
    });

  if (!ue) {
    return {
      message: 'UE introuvable',
    };
  }

  const etudiants =
    await this.etudiantRepository.find({
      where: {
        niveau: {
          id_niveau: ue.niveau.id_niveau,
        },
      },
      relations: [
        'niveau',
      ],
    });

  const existe =
    await this.anonymatRepository.count({
      where: {
        ue: {
          id_ue: idUe,
        },
        is_rattrapage: false,
      },
    });

  if (existe > 0) {
    return {
      message:
        'Les anonymats existent déjà pour cette UE',
    };
  }

  for (const etudiant of etudiants) {

    const code =
      await this.genererCodeUnique(
        'AN-',
      );

    const anonymat =
      this.anonymatRepository.create({
        code_anonymat: code,
        is_rattrapage: false,
        etudiant,
        ue,
      });

    await this.anonymatRepository.save(
      anonymat,
    );
  }

  return {
    message:
      'Anonymats générés avec succès',
    nombre:
      etudiants.length,
  };
}

  async findAll() {

    return this
      .anonymatRepository
      .find();
  }

  async findOne(
    id: number,
  ) {

    return this
      .anonymatRepository
      .findOne({

        where: {
          id_anonymat: id,
        },
      });
  }

  async create() {

    return {
      message:
        'Utiliser genererAnonymats',
    };
  }

  async update() {

    return {
      message:
        'Non implémenté',
    };
  }

  async remove(
    id: number,
  ) {

    await this
      .anonymatRepository
      .delete(id);

    return {

      message:
        'Anonymat supprimé',
    };
  }
  





  async genererAnonymatsRattrapage(
  idUe: number,
) {
  const ue =
    await this.ueRepository.findOne({
      where: {
        id_ue: idUe,
      },
    });

  if (!ue) {
    return {
      message: 'UE introuvable',
    };
  }

  const notes =
    await this.noteRepository.find({
      where: {
        ue: {
          id_ue: idUe,
        },
        est_rattrapable: true,
      },
      relations: [
        'etudiant',
      ],
    });

  if (notes.length === 0) {
    return {
      message:
        'Aucun étudiant éligible au rattrapage',
    };
  }

  const existe =
    await this.anonymatRepository.count({
      where: {
        ue: {
          id_ue: idUe,
        },
        is_rattrapage: true,
      },
    });

  if (existe > 0) {
    return {
      message:
        'Les anonymats de rattrapage existent déjà pour cette UE',
    };
  }

  for (const note of notes) {

    const code =
      await this.genererCodeUnique(
        'RT-',
      );

    const anonymat =
      this.anonymatRepository.create({
        code_anonymat: code,
        is_rattrapage: true,
        etudiant: note.etudiant,
        ue,
      });

    await this.anonymatRepository.save(
      anonymat,
    );
  }

  return {
    message:
      'Anonymats de rattrapage générés avec succès',
    nombre:
      notes.length,
  };
}

async listeParUe(
  idUe: number,
  rattrapage: boolean,
) {

  const anonymats =
    await this.anonymatRepository.find({

      where: {

        ue: {

          id_ue: idUe,
        },

        is_rattrapage:
          rattrapage,
      },

      relations: [

        'etudiant',
      ],

      order: {

        code_anonymat: 'ASC',
      },
    });

  return anonymats.map(

    (a) => ({

      id_anonymat:
        a.id_anonymat,

      code_anonymat:
        a.code_anonymat,

      is_rattrapage:
        a.is_rattrapage,

      matricule:
        a.etudiant.matricule,

      nom:
        a.etudiant.nom,

      prenom:
        a.etudiant.prenom,
    }),
  );
}


async supprimerParUe(
  idUe: number,
  rattrapage: boolean,
) {

  await this.anonymatRepository.delete({

    ue: {

      id_ue: idUe,
    },

    is_rattrapage:
      rattrapage,
  });

  return {

    message:
      "Anonymats supprimés",
  };
}


private async genererCodeUnique(
  prefixe: string,
): Promise<string> {

  while (true) {

    const caracteres =
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = prefixe;

    for (let i = 0; i < 6; i++) {

      code +=
        caracteres[
          Math.floor(
            Math.random() *
                caracteres.length,
          )
        ];
    }

    const existe =
      await this.anonymatRepository.findOne({

        where: {

          code_anonymat: code,
        },
      });

    if (!existe) {

      return code;
    }
  }
}
}