import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filiere } from './entities/filiere.entity';
import { CreateFiliereDto } from './dto/create-filiere.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';

@Injectable()
export class FiliereService {

  constructor(
    @InjectRepository(Filiere)
    private filiereRepo: Repository<Filiere>,
  ) {}

  create(createFiliereDto: CreateFiliereDto) {
    const filiere = this.filiereRepo.create(createFiliereDto);
    return this.filiereRepo.save(filiere);
  }

  findAll() {
    return this.filiereRepo.find();
  }

  findOne(id: number) {
    return this.filiereRepo.findOne({
      where: { id_filiere: id },
    });
  }

  update(id: number, updateFiliereDto: UpdateFiliereDto) {
    return this.filiereRepo.update(id, updateFiliereDto);
  }

  remove(id: number) {
    return this.filiereRepo.delete(id);
  }
}