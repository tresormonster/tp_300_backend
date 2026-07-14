
//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './entities/cycle.entity';
import { CycleService } from './cycle.service';
import { CycleController } from './cycle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cycle])],
  controllers: [CycleController],
  providers: [CycleService],
})
export class CycleModule {}
