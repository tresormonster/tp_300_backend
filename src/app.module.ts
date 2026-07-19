import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { AnonymatModule } from './anonymat/anonymat.module';
import { RequeteModule } from './requete/requete.module';
import { AdminModule } from './admin/admin.module';
import { ImportEtudiantsModule }
from './import-etudiants/import-etudiants.module';

import { AppController }
from './app.controller';

import { AppService }
from './app.service';

import { TypeOrmModule }
from '@nestjs/typeorm';

import { EtudiantModule }
from './etudiant/etudiant.module';

import { NiveauModule }
from './niveau/niveau.module';

import { CycleModule }
from './cycle/cycle.module';

import { FiliereModule }
from './filiere/filiere.module';

import { EnseignantModule }
from './enseignant/enseignant.module';

import { UeModule }
from './ue/ue.module';

import { EnseignementModule }
from './enseignement/enseignement.module';

import { AuthModule }
from './auth/auth.module';


@Module({

  imports: [

    TypeOrmModule.forRoot({

      type: 'postgres',

      

      host: 'localhost',

      port: 5432,

      username: 'postgres',

      password: 'toyce1306',

      database: 'gestion_notes',

      autoLoadEntities: true,

      synchronize: true,
    }),

    // 🔥 MODULES
    AuthModule,

    EtudiantModule,

    NiveauModule,

    CycleModule,

    FiliereModule,

    EnseignantModule,

    UeModule,

    EnseignementModule,

    NoteModule,

    AnonymatModule,

    RequeteModule,

    ImportEtudiantsModule,

    AdminModule,
  ],

  controllers: [
    AppController,
  ],

  providers: [
    AppService,
  ],
})

export class AppModule {}