import { Module } from '@nestjs/common';
import { FiliereService } from './filiere.service';
import { FiliereController } from './filiere.controller';
import { Filiere } from './entities/filiere.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [TypeOrmModule.forFeature([Filiere])],
  controllers: [FiliereController],
  providers: [FiliereService],
})
export class FiliereModule {}
