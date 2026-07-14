import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { Etudiant } from './entities/etudiant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant])],
  controllers: [EtudiantController],
  providers: [EtudiantService],
})
export class EtudiantModule {}