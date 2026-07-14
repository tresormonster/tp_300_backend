import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Requete } from './entities/requete.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Enseignant } from '../enseignant/entities/enseignant.entity';
import { UE } from '../ue/entities/ue.entity';

import { RequeteService } from './requete.service';
import { RequeteController } from './requete.controller';
import { Enseignement } from '../enseignement/entities/enseignement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Requete,
      Etudiant,
      Enseignant,
      UE,
      Enseignement,
    ]),
  ],
  controllers: [
    RequeteController,
  ],
  providers: [
    RequeteService,
  ],
})
export class RequeteModule {}