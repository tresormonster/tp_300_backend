import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Note } from './entities/note.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { UE } from '../ue/entities/ue.entity';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Anonymat } from '../anonymat/entities/anonymat.entity';
import PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class NoteService {

  constructor(

    @InjectRepository(Note)
    private noteRepository: Repository<Note>,

    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,

    @InjectRepository(UE)
    private ueRepository: Repository<UE>,

    @InjectRepository(Anonymat)
    private anonymatRepository:
    Repository<Anonymat>,
  ) {}

  async create(
  createNoteDto: CreateNoteDto,
) {

  const etudiant =
    await this.etudiantRepository.findOne({
      where: {
        id_etudiant:
          createNoteDto.id_etudiant,
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
          createNoteDto.id_ue,
      },
    });

  if (!ue) {

    return {
      message:
        'UE introuvable',
    };
  }



const existe =
  await this.noteRepository.findOne({

    where: {

      etudiant: {

        id_etudiant:
          createNoteDto.id_etudiant,
      },

      ue: {

        id_ue:
          createNoteDto.id_ue,
      },
    },
  });

if (existe) {

  return {

    message:
      'La note existe déjà',
  };
}


  let noteFinale = 0;

  if (ue.has_tp) {

    noteFinale =

      ((createNoteDto.note_cc ?? 0) * 0.20)

      +

      ((createNoteDto.note_tp ?? 0) * 0.40)

      +

      ((createNoteDto.note_sn ?? 0) * 0.40);

  } else {

    noteFinale =

      ((createNoteDto.note_cc ?? 0) * 0.30)

      +

      ((createNoteDto.note_sn ?? 0) * 0.70);
  }

  const note =
    this.noteRepository.create({

      note_cc:
        createNoteDto.note_cc,

      note_tp:
        createNoteDto.note_tp,

      note_sn:
        createNoteDto.note_sn,

      note_finale:
        Number(
          noteFinale.toFixed(2),
        ),

      publie:
        createNoteDto.publie ?? false,

      etudiant,

      ue,
    });

 if ((note.note_finale ?? 0) >= 50) {

  note.valide = true;

  note.est_rattrapable = false;

  note.decision = 'VALIDE';

} else {

  note.valide = false;

  note.est_rattrapable = true;

  note.decision = 'NON_VALIDE';
}

  await this
    .noteRepository
    .save(note);

  return note;
}


private async enregistrerNote(
  dto: CreateNoteDto,
  type: 'cc' | 'tp' | 'sn',
) {

  let note: Note;

  if (type == 'sn') {

    if (!dto.id_anonymat) {
      return;
    }

    const anonymat =
      await this.anonymatRepository.findOne({

        where: {

          id_anonymat:
            dto.id_anonymat,
        },

        relations: [
          'etudiant',
          'ue',
        ],
      });

    if (!anonymat) {
      return;
    }

    note =
      await this.getOrCreateNote(

        anonymat.etudiant.id_etudiant,

        anonymat.ue.id_ue,
      );

    if (

      anonymat.is_rattrapage &&

      note.note_sn_initiale == null

    ) {

      note.note_sn_initiale =
        note.note_sn;
    }

    if (dto.note_sn != null) {

  if (
    anonymat.is_rattrapage &&
    note.note_sn_initiale == null
  ) {

    note.note_sn_initiale =
      note.note_sn;
  }

  note.note_sn =
    dto.note_sn;
}

    note.est_rattrapage =
      anonymat.is_rattrapage;

  }

  else {

    note =
      await this.getOrCreateNote(

        dto.id_etudiant,

        dto.id_ue,
      );

    if (type == 'cc') {

  note.note_cc =
    dto.note_cc ?? null;

}

    else {

      note.note_tp =
  dto.note_tp ?? null;
    }
  }

  await this.recalculerNote(
    note,
  );
}


private async getOrCreateNote(
  idEtudiant: number,
  idUe: number,
) {

  let note =
    await this.noteRepository.findOne({

      where: {

        etudiant: {
          id_etudiant: idEtudiant,
        },

        ue: {
          id_ue: idUe,
        },
      },

      relations: [
        'etudiant',
        'ue',
      ],
    });

  if (note) {
    return note;
  }

  const etudiant =
    await this.etudiantRepository.findOne({

      where: {
        id_etudiant: idEtudiant,
      },
    });

  const ue =
    await this.ueRepository.findOne({

      where: {
        id_ue: idUe,
      },
    });

  if (!etudiant || !ue) {

    throw new Error(
      'Etudiant ou UE introuvable',
    );
  }

  note =
    this.noteRepository.create({

      note_cc: null as any,

      note_tp: null as any,

      note_sn: null as any,

      note_finale: 0,

      publie: false,

      etudiant,

      ue,

    } as Partial<Note>);

  return this.noteRepository.save(
    note,
  );
}




private async recalculerNote(
  note: Note,
) {

  if (note.ue.has_tp) {

    note.note_finale =

      (note.note_cc ?? 0)

      +

      (note.note_tp ?? 0)

      +

      (note.note_sn ?? 0);

  }

  else {

    note.note_finale =

      (note.note_cc ?? 0)

      +

      (note.note_sn ?? 0);

  }

  note.note_finale =
    Number(
      note.note_finale.toFixed(2),
    );

 if ((note.note_finale ?? 0) >= 50) {

  note.valide = true;

  note.est_rattrapable = false;

  note.decision = 'VALIDE';

} else {

  note.valide = false;

  note.est_rattrapable = true;

  note.decision = 'NON_VALIDE';
}
  return this.noteRepository.save(
    note,
  );
}



  async findAll() {

    return this.noteRepository.find();
  }

  async findOne(
    id: number,
  ) {

    return this.noteRepository.findOne({
      where: {
        id_note: id,
      },
    });
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
  ) {

    return {
      id,
      data: updateNoteDto,
    };
  }

  async remove(
    id: number,
  ) {

    await this.noteRepository.delete(id);

    return {
      message: 'Note supprimée',
    };
  }
  async publier(
  id: number,
) {

  const note =
    await this.noteRepository.findOne({

      where: {
        id_note: id,
      },
    });

  if (!note) {

    return {
      message: 'Note introuvable',
    };
  }

  note.publie = true;

  await this.noteRepository.save(
    note,
  );

  return {
    message: 'Note publiée',
    note,
  };
 }
 





 async notesEtudiant(
  idEtudiant: number,
) {

  const notes =
      await this.noteRepository.find({

    where: {

      etudiant: {

        id_etudiant:
            idEtudiant,
      },

      publie: true,
    },

    relations: [

      'ue',
    ],
  });

 return notes.map((n) => {

 const notesCompletes =

  n.ue.has_tp

    ? (
        n.note_cc != null &&
        n.note_tp != null &&
        n.note_sn != null
      )

    : (
        n.note_cc != null &&
        n.note_sn != null
      );

const statut =

  !notesCompletes

    ? 'EN_ATTENTE'

    : n.decision == 'VALIDE'

        ? 'VALIDE'

        : n.est_rattrapable

            ? 'RATTRAPAGE'

            : 'NON_VALIDE';

  const couleur =

    statut == 'EN_ATTENTE'

      ? 'grey'

      : statut == 'VALIDE'

          ? 'green'

          : statut == 'RATTRAPAGE'

              ? 'orange'

              : 'red';

  const libelleStatut =

    statut == 'EN_ATTENTE'

      ? 'Résultat non disponible'

      : statut == 'VALIDE'

          ? 'Validé'

          : statut == 'RATTRAPAGE'

              ? 'Rattrapage autorisé'

              : 'Non validé';

  return {

    id_note: n.id_note,

    code_ue: n.ue.code_ue,

    nom_ue: n.ue.nom_ue,

    credit: n.ue.credit,

    note_cc: n.note_cc,

    note_tp: n.note_tp,

    note_sn: n.note_sn,

    note_finale:

  !notesCompletes

    ? null

    : n.note_finale,

    decision: n.decision,

    semestre: n.ue.semestre,

    has_tp: n.ue.has_tp,

    statut: statut,

    couleur: couleur,

    libelle_statut: libelleStatut,
  };
});
}




private async listeNotesEtudiants(
  idUe: number,
  type: 'cc' | 'tp',
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
    return [];
  }

  const etudiants =
    await this.etudiantRepository.find({

      where: {

        niveau: {

          id_niveau:
            ue.niveau.id_niveau,
        },
      },

      order: {

        matricule: 'ASC',
      },
    });

  const notes =
    await this.noteRepository.find({

      where: {

        ue: {
          id_ue: idUe,
        },
      },

      relations: [
        'etudiant',
      ],
    });

  const notesMap =
      new Map();

  for (const note of notes) {

    notesMap.set(

      note.etudiant.id_etudiant,

      note,
    );
  }

  return etudiants.map(

    (etudiant)=> {

      const note =
          notesMap.get(

        etudiant.id_etudiant,
      );

      return {

        id_etudiant:
          etudiant.id_etudiant,

        matricule:
          etudiant.matricule,

        nom:
          etudiant.nom,

        prenom:
          etudiant.prenom,

        note_cc:
          note?.note_cc ?? null,

        note_tp:
          note?.note_tp ?? null,
      };
    },
  );
}

async listeCC(
  idUe: number,
) {

  return this.listeNotesEtudiants(
    idUe,
    'cc',
  );
}






async enregistrerCC(
  notes: CreateNoteDto[],
) {

  for (const dto of notes) {

    await this.enregistrerNote(
      dto,
      'cc',
    );
  }

  return {

    message:
      'Notes CC enregistrées',
  };
}



async listeTP(
  idUe: number,
) {

  const ue =
    await this.ueRepository.findOne({

      where: {
        id_ue: idUe,
      },
    });

  if (!ue) {

    return [];
  }

  if (!ue.has_tp) {

    return {

      message:
        'Cette UE ne possède pas de TP',
    };
  }

  return this.listeNotesEtudiants(
    idUe,
    'tp',
  );
}




async enregistrerTP(
  notes: CreateNoteDto[],
) {

  for (const dto of notes) {

    await this.enregistrerNote(
      dto,
      'tp',
    );
  }

  return {

    message:
      'Notes TP enregistrées',
  };
}





async listeSN(
  idUe: number,
) {

  const anonymats =
    await this.anonymatRepository.find({

      where: {

        ue: {

          id_ue: idUe,
        },

        is_rattrapage: false,
      },

      relations: [
        'etudiant',
        'ue',
      ],

      order: {

        code_anonymat: 'ASC',
      },
    });

  const resultat: any[] = [];

  for (const anonymat of anonymats) {

    const note =
      await this.noteRepository.findOne({

        where: {

          etudiant: {

            id_etudiant:
              anonymat.etudiant.id_etudiant,
          },

          ue: {

            id_ue:
              idUe,
          },
        },
      });

    resultat.push({

      id_anonymat:
        anonymat.id_anonymat,

      code_anonymat:
        anonymat.code_anonymat,

      note_sn:
        note?.note_sn ?? null,
    });
  }

  return resultat;
}




async enregistrerSN(
  notes: CreateNoteDto[],
) {

  for (const dto of notes) {

    await this.enregistrerNote(
      dto,
      'sn',
    );
  }

  return {

    message:
      'Notes SN enregistrées',
  };
}


async listeRattrapage(
  idUe: number,
) {

  const anonymats =
    await this.anonymatRepository.find({

      where: {

        ue: {

          id_ue: idUe,
        },

        is_rattrapage: true,
      },

      relations: [
        'etudiant',
        'ue',
      ],

      order: {

        code_anonymat: 'ASC',
      },
    });

  const resultat: any[] = [];

  for (const anonymat of anonymats) {

    const note =
      await this.noteRepository.findOne({

        where: {

          etudiant: {

            id_etudiant:
              anonymat.etudiant.id_etudiant,
          },

          ue: {

            id_ue:
              idUe,
          },
        },
      });

    resultat.push({

      id_anonymat:
        anonymat.id_anonymat,

      code_anonymat:
        anonymat.code_anonymat,

      note_sn:
        note?.note_sn ?? null,
    });
  }

  return resultat;
}

async enregistrerRattrapage(
  notes: CreateNoteDto[],
) {

  for (const dto of notes) {

    await this.enregistrerNote(
      dto,
      'sn',
    );
  }

  return {

    message:
      'Notes de rattrapage enregistrées',
  };
}



async publierUe(
  idUe: number,
) {

  const notes =
    await this.noteRepository.find({

      where: {

        ue: {
          id_ue: idUe,
        },
      },
    });

  for (const note of notes) {

    note.publie = true;

    await this.noteRepository.save(
      note,
    );
  }

  return {

    message:
      'Notes publiées',
  };
}



async genererBulletin(
  idEtudiant: number,
  res: Response,
) {

  const etudiant =
    await this.etudiantRepository.findOne({

      where: {
        id_etudiant: idEtudiant,
      },

      relations: [
        'niveau',
      ],
    });

  if (!etudiant) {

    return res.status(404).json({

      message: 'Etudiant introuvable',
    });
  }

  const notes =
    await this.noteRepository.find({

      where: {

        etudiant: {

          id_etudiant: idEtudiant,
        },

        publie: true,
      },

      relations: [
        'ue',
      ],
    });

  const doc =
    new PDFDocument();

  res.setHeader(
    'Content-Type',
    'application/pdf',
  );

  res.setHeader(

    'Content-Disposition',

    `attachment; filename=bulletin_${etudiant.matricule}.pdf`,
  );

  doc.pipe(res);

  doc.fontSize(20);

  doc.text(
    'BULLETIN DE NOTES',
    {
      align: 'center',
    },
  );

  doc.moveDown();

  doc.fontSize(12);

  doc.text(
    `Matricule : ${etudiant.matricule}`,
  );

  doc.text(
    `Nom : ${etudiant.nom}`,
  );

  doc.text(
    `Prénom : ${etudiant.prenom}`,
  );

  doc.text(
    `Niveau : ${etudiant.niveau.nom_niveau}`,
  );

  doc.moveDown();

  doc.text(
    '--------------------------------------------------',
  );

  notes.forEach((n) => {

    doc.text(

      `${n.ue.code_ue}  |  CC:${n.note_cc ?? '-'}  |  TP:${n.note_tp ?? '-'}  |  SN:${n.note_sn ?? '-'}  |  Moy:${n.note_finale ?? '-'}`
    );
  });

  doc.moveDown();

  doc.text(
    '--------------------------------------------------',
  );

  doc.end();
}

}