import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UeService } from './ue.service';
import { UeController } from './ue.controller';
import { UE } from './entities/ue.entity';
import { Niveau } from 'src/niveau/entities/niveau.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UE, Niveau]), // 💥 IMPORTANT
  ],
  controllers: [UeController],
  providers: [UeService],
})
export class UeModule {}