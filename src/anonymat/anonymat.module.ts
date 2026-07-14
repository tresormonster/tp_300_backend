import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Anonymat } from './entities/anonymat.entity';
import { UE } from '../ue/entities/ue.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';

import { AnonymatService } from './anonymat.service';
import { AnonymatController } from './anonymat.controller';
import { Note } from '../note/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Anonymat,
      UE,
      Etudiant,
      Note,
    ]),
  ],

  controllers: [
    AnonymatController,
  ],

  providers: [
    AnonymatService,
  ],

  exports: [
    TypeOrmModule,
  ],
})
export class AnonymatModule {}