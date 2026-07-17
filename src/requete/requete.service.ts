import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Requete } from './entities/requete.entity';
import { Note } from '../note/entities/note.entity';

import { CreateRequeteDto } from './dto/create-requete.dto';
import { UpdateRequeteDto } from './dto/update-requete.dto';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Enseignant } from '../enseignant/entities/enseignant.entity';
import { UE } from '../ue/entities/ue.entity';
import { Enseignement } from '../enseignement/entities/enseignement.entity';

@Injectable()
export class RequeteService {

  constructor(

    @InjectRepository(Note)
private noteRepository: Repository<Note>,

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

  const note =
  await this.noteRepository.findOne({

    where: {

      etudiant: {
        id_etudiant:
          createRequeteDto.id_etudiant,
      },

      ue: {
        id_ue:
          createRequeteDto.id_ue,
      },
    },
  });

if (!note || !note.publie) {

  return {

    message:
      'Les résultats de cette UE ne sont pas encore publiés',
  };
}


const requeteExistante =
  await this.requeteRepository.findOne({

    where: {

      etudiant: {
        id_etudiant:
          createRequeteDto.id_etudiant,
      },

      ue: {
        id_ue:
          createRequeteDto.id_ue,
      },

      statut: 'EN_ATTENTE',
    },
  });

if (requeteExistante) {

  return {

    message:
      'Une requête est déjà en attente pour cette UE',
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

    pieces_jointes:
      createRequeteDto.pieces_jointes ?? [],

    statut:
      'EN_ATTENTE',

    date_creation:
      new Date(),

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

    const requete =
      await this.requeteRepository.findOne({

        where: {
          id_requete: id,
        },
      });

    if (requete?.statut != 'EN_ATTENTE') {

      return {
        message:
          'Modification impossible',
      };
    }

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
  
    const requete =
      await this.requeteRepository.findOne({

        where: {
          id_requete: id,
        },
      });

    if (!requete) {

      return {
        message: 'Requête introuvable',
      };
    }

    if (requete.statut != 'EN_ATTENTE') {

      return {
        message:
          'Impossible de supprimer une requête déjà traitée',
      };
    }

    await this
      .requeteRepository
      .delete(id);

    return {

      message:
        'Requête supprimée',
    };
  }


  async requetesEtudiant(
  idEtudiant: number,
) {

  const requetes =
    await this.requeteRepository.find({

      where: {

        etudiant: {

          id_etudiant:
            idEtudiant,
        },
      },

      relations: [
        'ue',
        'etudiant',
        'enseignant',
      ],

      order: {
        id_requete: 'DESC',
      },
    });

  return requetes.map(

  (r) => ({

    id_requete:
      r.id_requete,

    objet:
      r.objet,

    message:
      r.message,

    statut:
      r.statut,

    reponse:
      r.reponse,

    pieces_jointes:
      r.pieces_jointes,

    date_creation:
      r.date_creation,

    date_reponse:
      r.date_reponse,

    code_ue:
      r.ue.code_ue,

    nom_ue:
      r.ue.nom_ue,

    nom_etudiant:
      r.etudiant.nom,

    prenom_etudiant:
      r.etudiant.prenom,

    matricule:
      r.etudiant.matricule,

    nom_enseignant:
      r.enseignant?.nom,

    prenom_enseignant:
      r.enseignant?.prenom,
  }),
);
}



async repondre(
  id: number,
  reponse: string,
  statut: string,
) {

  const requete =
    await this.requeteRepository.findOne({

      where: {
        id_requete: id,
      },
    });

  if (!requete) {

    return {
      message:
        'Requête introuvable',
    };
  }

  requete.reponse =
    reponse;

 requete.statut =
  statut;

requete.date_reponse =
  new Date();

  await this.requeteRepository.save(
    requete,
  );

  return requete;
}





async requetesEnseignant(
  idEnseignant: number,
) {

  const requetes =
    await this.requeteRepository.find({

      where: {

        enseignant: {

          id_enseignant:
            idEnseignant,
        },
      },

      relations: [
        'etudiant',
        'ue',
      ],

      order: {
        id_requete: 'DESC',
      },
    });

  return requetes.map(

  (r) => ({

    id_requete:
      r.id_requete,

    objet:
      r.objet,

    message:
      r.message,

    statut:
      r.statut,

    reponse:
      r.reponse,

    pieces_jointes:
      r.pieces_jointes,

    date_creation:
      r.date_creation,

    nom_etudiant:
      r.etudiant.nom,

    prenom_etudiant:
      r.etudiant.prenom,

    matricule:
      r.etudiant.matricule,

    code_ue:
      r.ue.code_ue,

    nom_ue:
      r.ue.nom_ue,

    nom_enseignant:
      r.enseignant?.nom,

    prenom_enseignant:
      r.enseignant?.prenom,
  }),
);
}
}