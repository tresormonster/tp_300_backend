import { Module } from '@nestjs/common';
import { ImportEtudiantService } from './import-etudiant.service';
import { ImportEtudiantController } from './import-etudiant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportEtudiant } from './entities/import-etudiant.entity';

@Module({

  imports: [
  TypeOrmModule.forFeature([
    ImportEtudiant,
  ]),
],
  controllers: [ImportEtudiantController],
  providers: [ImportEtudiantService],
})
export class ImportEtudiantModule {}
