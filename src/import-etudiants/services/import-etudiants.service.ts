import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Etudiant } from '../../etudiant/entities/etudiant.entity';
import { Filiere } from '../../filiere/entities/filiere.entity';
import { Niveau } from '../../niveau/entities/niveau.entity';
import { Cycle } from '../../cycle/entities/cycle.entity';
@Injectable()
export class ImportEtudiantsService {

  constructor(

    @InjectRepository(Etudiant)
    private etudiantRepository:
      Repository<Etudiant>,

    @InjectRepository(Filiere)
    private filiereRepository:
      Repository<Filiere>,

    @InjectRepository(Niveau)
    private niveauRepository:
      Repository<Niveau>,


      @InjectRepository(Cycle)
private cycleRepository:
  Repository<Cycle>,
  ) {}

  async importExcel(
    file: any,
  cycleNom: string,
  filiereNom: string,
  niveauNom: string,
  ) {

    let filiere =
      await this.filiereRepository.findOne({

        where: {
          nom_filiere: filiereNom,
        },
      });

    if (!filiere) {

      filiere =
        this.filiereRepository.create({

          nom_filiere: filiereNom,
        });

      await this.filiereRepository.save(
        filiere,
      );
    }

    let cycle =
  await this.cycleRepository.findOne({

    where: {
      nom_cycle: cycleNom,
    },
  });

if (!cycle) {

  cycle =
    this.cycleRepository.create({

      nom_cycle: cycleNom,
    });

  await this.cycleRepository.save(
    cycle,
  );
}

let niveau =
  await this.niveauRepository.findOne({

    where: {
      nom_niveau: niveauNom,
    },
  });

if (!niveau) {

  niveau =
    this.niveauRepository.create({

      nom_niveau: niveauNom,

      filiere,

      cycle,
    });

  await this.niveauRepository.save(
    niveau,
  );
}

    const workbook =
      XLSX.read(file.buffer, {

        type: 'buffer',
      });

    const sheetName =
      workbook.SheetNames[0];

    const sheet =
      workbook.Sheets[sheetName];

    const data =
      XLSX.utils.sheet_to_json(sheet);
      console.log(data.slice(0, 10));

       for (const row of data as any[]) {

  const matricule =
    row.__EMPTY_3;

  const nomComplet =
    row.__EMPTY_1;

  if (!matricule || !nomComplet) {
    continue;
  }

  const existe =
    await this.etudiantRepository.findOne({

      where: {
        matricule,
      },
    });

  if (existe) {
    continue;
  }

  const parties =
    nomComplet
      .trim()
      .split(' ');

  const nom =
    parties[0];

  const prenom =
    parties
      .slice(1)
      .join(' ');

  const etudiant =
    this.etudiantRepository.create({

      matricule,

      nom,

      prenom,

       email: null as any,

      mot_de_passe: null,

      compte_active: false,

      niveau,
    });

  await this
    .etudiantRepository
    .save(etudiant);
}

    return {

      message:
        'Importation réussie',
    };
  }
}