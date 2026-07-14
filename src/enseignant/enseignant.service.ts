import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enseignant } from './entities/enseignant.entity';
import { CreateEnseignantDto } from './dto/create-enseignant.dto';
import { UpdateEnseignantDto } from './dto/update-enseignant.dto';
import { PasswordService }
from '../security/password.service';
@Injectable()
export class EnseignantService {

  constructor(
    @InjectRepository(Enseignant)
    private ensRepo: Repository<Enseignant>,
  ) {}

  async create(
  dto: CreateEnseignantDto,
) {

  const hashedPassword =
      await PasswordService.hash(

    dto.mot_de_passe,
  );

  const ens =
      this.ensRepo.create({

    ...dto,

    mot_de_passe:
        hashedPassword,
  });

  return this.ensRepo.save(
    ens,
  );
}

  findAll() {
    return this.ensRepo.find({
      relations: ['enseignements'],
    });
  }

  findOne(id: number) {
    return this.ensRepo.findOne({
      where: { id_enseignant: id },
      relations: ['enseignements'],
    });
  }

 async update(
  id: number,
  dto: UpdateEnseignantDto,
) {

  if (dto.mot_de_passe) {

    dto.mot_de_passe =
        await PasswordService.hash(
          dto.mot_de_passe,
        );
  }

  await this.ensRepo.update(
    id,
    dto,
  );

  return this.findOne(id);
}

  remove(id: number) {
    return this.ensRepo.delete(id);
  }
}