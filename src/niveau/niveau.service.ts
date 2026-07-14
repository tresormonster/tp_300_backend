import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Niveau } from './entities/niveau.entity';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';

@Injectable()
export class NiveauService {

  constructor(
    @InjectRepository(Niveau)
    private niveauRepo: Repository<Niveau>,
  ) {}

  // ➕ CREATE
  async create(dto: CreateNiveauDto) {
    const niveau = this.niveauRepo.create({
      nom_niveau: dto.nom_niveau,
      cycle: { id_cycle: dto.id_cycle },
      filiere: { id_filiere: dto.id_filiere },
    });

    return this.niveauRepo.save(niveau);
  }

  // 📥 GET ALL
  findAll() {
    return this.niveauRepo.find({
      relations: ['cycle', 'filiere'],
    });
  }

  // 📥 GET ONE
  findOne(id: number) {
    return this.niveauRepo.findOne({
      where: { id_niveau: id },
      relations: ['cycle', 'filiere'],
    });
  }

  // ✏️ UPDATE
  async update(id: number, dto: UpdateNiveauDto) {
    await this.niveauRepo.update(id, {
      nom_niveau: dto.nom_niveau,
    });

    return this.findOne(id);
  }

  // ❌ DELETE
  remove(id: number) {
    return this.niveauRepo.delete(id);
  }

  async findByFiliere(
  idFiliere: number,
) {

  return this.niveauRepo.find({

    where: {

      filiere: {

        id_filiere:
          idFiliere,
      },
    },

    relations: [
      'filiere',
      'cycle',
    ],
  });
}
}