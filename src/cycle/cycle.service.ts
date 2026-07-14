import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from './entities/cycle.entity';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';

@Injectable()
export class CycleService {

  constructor(
    @InjectRepository(Cycle)
    private cycleRepo: Repository<Cycle>,
  ) {}

  create(createCycleDto: CreateCycleDto) {
    const cycle = this.cycleRepo.create(createCycleDto);
    return this.cycleRepo.save(cycle);
  }

  findAll() {
    return this.cycleRepo.find();
  }

  findOne(id: number) {
    return this.cycleRepo.findOne({
      where: { id_cycle: id },
    });
  }

  update(id: number, updateCycleDto: UpdateCycleDto) {
    return this.cycleRepo.update(id, updateCycleDto);
  }

  remove(id: number) {
    return this.cycleRepo.delete(id);
  }
}