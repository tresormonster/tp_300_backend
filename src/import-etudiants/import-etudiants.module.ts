import { Module }
from '@nestjs/common';

import { TypeOrmModule }
from '@nestjs/typeorm';

import { Etudiant }
from '../etudiant/entities/etudiant.entity';

import { ImportEtudiantsController }
from './controllers/import-etudiants.controller';

import { ImportEtudiantsService }
from './services/import-etudiants.service';
import { Filiere } 
from '../filiere/entities/filiere.entity';
import { Niveau } 
from '../niveau/entities/niveau.entity';
import { Cycle } from '../cycle/entities/cycle.entity';
import { ImportEtudiant } from '../import-etudiant/entities/import-etudiant.entity';

@Module({

  imports: [

    TypeOrmModule.forFeature([
  Etudiant,
  Filiere,
  Niveau,
  Cycle,
  ImportEtudiant,
])
  ],

  controllers: [

    ImportEtudiantsController,
  ],

  providers: [

    ImportEtudiantsService,
  ],
})
export class ImportEtudiantsModule {}