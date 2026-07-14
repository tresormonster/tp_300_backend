import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Note } from './entities/note.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { UE } from '../ue/entities/ue.entity';

import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Anonymat } from '../anonymat/entities/anonymat.entity';


@Module({
  imports: [
   TypeOrmModule.forFeature([
  Note,
  Etudiant,
  UE,
  Anonymat,
]),
  ],

  controllers: [
    NoteController,
  ],

  providers: [
    NoteService,
  ],

  exports: [
    TypeOrmModule,
  ],
})
export class NoteModule {}