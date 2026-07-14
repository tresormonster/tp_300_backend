import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnseignementService } from './enseignement.service';
import { EnseignementController } from './enseignement.controller';
import { Enseignement } from './entities/enseignement.entity';
import { Enseignant } from 'src/enseignant/entities/enseignant.entity';
import { UE } from 'src/ue/entities/ue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Enseignement, // 💥 OBLIGATOIRE
      Enseignant,   // 💥 relation
      UE            // 💥 relation
    ]),
  ],
  controllers: [EnseignementController],
  providers: [EnseignementService],
})
export class EnseignementModule {}