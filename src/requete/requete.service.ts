import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Requete } from './entities/requete.entity';

import { CreateRequeteDto } from './dto/create-requete.dto';
import { UpdateRequeteDto } from './dto/update-requete.dto';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Enseignant } from '../enseignant/entities/enseignant.entity';
import { UE } from '../ue/entities/ue.entity';
import { Enseignement } from '../enseignement/entities/enseignement.entity';

@Injectable()
export class RequeteService {

  constructor(

    @InjectRepository(Requete)
    private requeteRepository:
      Repository<Requete>,


      @InjectRepository(Etudiant)
private etudiantRepository:
  Repository<Etudiant>,

@InjectRepository(Enseignant)
private enseignantRepository:
  Repository<Enseignant>,

@InjectRepository(UE)
private ueRepository:
  Repository<UE>,

@InjectRepository(Enseignement)
private enseignementRepository:
  Repository<Enseignement>,
  ) {}

  async create(
  createRequeteDto: CreateRequeteDto,
) {

  const etudiant =
    await this.etudiantRepository.findOne({

      where: {
        id_etudiant:
          createRequeteDto.id_etudiant,
      },
    });

  if (!etudiant) {

    return {
      message:
        'Etudiant introuvable',
    };
  }

  const ue =
    await this.ueRepository.findOne({

      where: {
        id_ue:
          createRequeteDto.id_ue,
      },
    });

  if (!ue) {

    return {
      message:
        'UE introuvable',
    };
  }

  const enseignement =
    await this.enseignementRepository.findOne({

      where: {
        ue: {
          id_ue:
            createRequeteDto.id_ue,
        },
      },

      relations: [
        'enseignant',
      ],
    });

  if (!enseignement) {

    return {
      message:
        'Aucun enseignant affecté à cette UE',
    };
  }

  const requete =
    this.requeteRepository.create({

      objet:
        createRequeteDto.objet,

      message:
        createRequeteDto.message,

      statut:
        'EN_ATTENTE',

      etudiant,

      ue,

      enseignant:
        enseignement.enseignant,
    });

  return await this
    .requeteRepository
    .save(requete);
}

  async findAll() {

    return this
      .requeteRepository
      .find();
  }

  async findOne(
    id: number,
  ) {

    return this
      .requeteRepository
      .findOne({

        where: {
          id_requete: id,
        },
      });
  }

  async update(
    id: number,
    updateRequeteDto: UpdateRequeteDto,
  ) {

    await this
      .requeteRepository
      .update(
        id,
        updateRequeteDto,
      );

    return this.findOne(id);
  }

  async remove(
    id: number,
  ) {

    await this
      .requeteRepository
      .delete(id);

    return {

      message:
        'Requête supprimée',
    };
  }
}