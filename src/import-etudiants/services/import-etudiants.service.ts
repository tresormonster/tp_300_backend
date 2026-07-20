import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Etudiant } from '../../etudiant/entities/etudiant.entity';
import { Filiere } from '../../filiere/entities/filiere.entity';
import { Niveau } from '../../niveau/entities/niveau.entity';
import { Cycle } from '../../cycle/entities/cycle.entity';
import { ImportEtudiant } from '../../import-etudiant/entities/import-etudiant.entity';

import { BadRequestException } from '@nestjs/common';
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



  @InjectRepository(ImportEtudiant)
private importEtudiantRepository:
  Repository<ImportEtudiant>,
  ) {}

  async importExcel(
  file: any,
  cycleNom: string,
  filiereNom: string,
  niveauNom: string,
) {

  // ===============================
  // Filière
  // ===============================

  let filiere = await this.filiereRepository.findOne({
    where: {
      nom_filiere: filiereNom,
    },
  });

  if (!filiere) {
    filiere = this.filiereRepository.create({
      nom_filiere: filiereNom,
    });

    await this.filiereRepository.save(filiere);
  }

  // ===============================
  // Cycle
  // ===============================

  let cycle = await this.cycleRepository.findOne({
    where: {
      nom_cycle: cycleNom,
    },
  });

  if (!cycle) {
    cycle = this.cycleRepository.create({
      nom_cycle: cycleNom,
    });

    await this.cycleRepository.save(cycle);
  }

  // ===============================
  // Niveau
  // ===============================

  let niveau =
  await this.niveauRepository.findOne({

    where: {

      nom_niveau: niveauNom,

      filiere: {
        id_filiere: filiere.id_filiere,
      },

      cycle: {
        id_cycle: cycle.id_cycle,
      },
    },

    relations: [
      "filiere",
      "cycle",
    ],
  });

  if (!niveau) {
    niveau = this.niveauRepository.create({
      nom_niveau: niveauNom,
      filiere,
      cycle,
    });

    await this.niveauRepository.save(niveau);
  }





  // ===============================
// Vérification si des étudiants existent déjà
// ===============================

const nbEtudiants = await this.etudiantRepository.count({
  where: {
    niveau: {
      id_niveau: niveau.id_niveau,
    },
  },
});

if (nbEtudiants > 0) {
  throw new BadRequestException(
    `La liste des étudiants de ${cycleNom} / ${filiereNom} / ${niveauNom} existe déjà (${nbEtudiants} étudiants).`,
  );
}


  
  // ===============================
  // Lecture Excel
  // ===============================


  console.log("Nom du fichier :", file.originalname);
console.log("Taille du fichier (octets) :", file.size);
console.log("Taille du buffer :", file.buffer.length);
 const workbook = XLSX.read(file.buffer, {
  type: "buffer",
});

const sheet = workbook.Sheets[workbook.SheetNames[0]];

const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:A1");

for (const cell of Object.keys(sheet)) {
  if (cell.startsWith("!")) continue;

  const pos = XLSX.utils.decode_cell(cell);

  if (pos.r > range.e.r) range.e.r = pos.r;
  if (pos.c > range.e.c) range.e.c = pos.c;
}

sheet["!ref"] = XLSX.utils.encode_range(range);

const data = XLSX.utils.sheet_to_json(sheet, {
  header: 1,
  defval: "",
  blankrows: true,
}) as any[][];

  





  function normaliser(valeur: any): string {
  return String(valeur ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

  // ===============================
  // Recherche de la ligne des titres
  // ===============================
console.log("===== LIGNES EXCEL =====");

console.log("===== LIGNES EXCEL =====");

for (let i = 0; i < Math.min(data.length, 20); i++) {
  console.log(i, data[i]);
}

console.log("Nombre total de lignes :", data.length);

console.log("========================");

console.log("========================");
  const headerIndex = data.findIndex((row) => {
  if (!Array.isArray(row)) return false;

  const valeurs = row.map(normaliser);

  return (
    valeurs.includes("MATRICULE") &&
    valeurs.includes("NOMS ET PRENOMS")
  );
});

console.log("Header trouvé :", headerIndex);

if (headerIndex !== -1) {
  console.log("Ligne des titres :", data[headerIndex]);
}

  if (headerIndex === -1) {
    throw new BadRequestException(
  "Impossible de trouver les colonnes MATRICULE et NOMS ET PRENOMS dans le fichier Excel.",
);
  }

  console.log("Ligne des titres :", headerIndex);

  const header = data[headerIndex];

  // ===============================
  // Détection automatique des colonnes
  // ===============================

 const nomIndex = header.findIndex(
  (c: any) => normaliser(c) === "NOMS ET PRENOMS",
);

const matriculeIndex = header.findIndex(
  (c: any) => normaliser(c) === "MATRICULE",
);

  

  console.log("Colonne Nom :", nomIndex);
  console.log("Colonne Matricule :", matriculeIndex);

  const lignes = data.slice(headerIndex + 1);

  const historique = this.importEtudiantRepository.create({
  nom_fichier: file.originalname,
  cycle: cycleNom,
  filiere: filiereNom,
  niveau: niveauNom,
  nombre_etudiants: lignes.length,
  importes: 0,
  ignores: 0,
});

await this.importEtudiantRepository.save(historique);

  let importes = 0;
  let ignores = 0;

  // ===============================
  // Import
  // ===============================
const matriculesLus = new Set<string>();
  for (const row of lignes) {

    const nomComplet =
      String(row[nomIndex] ?? "").trim();

    const matricule =
      String(row[matriculeIndex] ?? "").trim();


      if (matriculesLus.has(matricule)) {
  throw new BadRequestException(
    `Le matricule ${matricule} apparaît plusieurs fois dans le fichier.`,
  );
}

matriculesLus.add(matricule);

    if (!nomComplet || !matricule) {
      continue;
    }

    const existe =
      await this.etudiantRepository.findOne({
        where: {
          matricule,
        },
      });

    if (existe) {
  console.log(`Étudiant déjà présent : ${matricule}`);

  ignores++;

  continue;
}

    const parties = nomComplet.split(/\s+/);

    const nom = parties.shift() ?? "";

    const prenom = parties.join(" ");

  const etudiant = this.etudiantRepository.create({
  matricule,
  nom,
  prenom,
  email: null as any,
  mot_de_passe: null,
  compte_active: false,
  niveau,
  importEtudiant: {
    id_import: historique.id_import,
  } as ImportEtudiant,
});

console.log("Étudiant avant save :", etudiant);
    await this.etudiantRepository.save(
      etudiant,
    );
    console.log(etudiant.importEtudiant);

    importes++;
  }

  console.log(
    `Importés : ${importes} | Ignorés : ${ignores}`
  );


  historique.importes = importes;
historique.ignores = ignores;


console.log("Après save historique", historique);

await this.importEtudiantRepository.save(historique);
console.log("ID IMPORT =", historique.id_import);

  return {
    message: "Importation terminée",
    importes,
    ignores,
  };
}



async getHistorique() {
  return this.importEtudiantRepository.find({
    order: {
      date_import: 'DESC',
    },
  });
}

async supprimerImport(id: number) {

  const historique = await this.importEtudiantRepository.findOne({
    where: {
      id_import: id,
    },
  });

  if (!historique) {
    throw new BadRequestException(
      "Import introuvable.",
    );
  }

  await this.importEtudiantRepository.delete(id);

  return {
    message: "Import supprimé avec succès.",
  };
}
}