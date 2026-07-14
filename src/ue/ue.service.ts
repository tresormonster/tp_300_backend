import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UE } from './entities/ue.entity';
import { Niveau } from '../niveau/entities/niveau.entity';

import { CreateUeDto } from './dto/create-ue.dto';
import { UpdateUeDto } from './dto/update-ue.dto';

@Injectable()
export class UeService {

  constructor(

    @InjectRepository(UE)
    private ueRepo: Repository<UE>,

    @InjectRepository(Niveau)
    private niveauRepo: Repository<Niveau>,
  ) {}

  // CREATE
  async create(dto: CreateUeDto) {

    const niveau =
      await this.niveauRepo.findOne({

        where: {
          id_niveau: dto.id_niveau,
        },
      });

    if (!niveau) {

      return {
        message: 'Niveau introuvable',
      };
    }

    const ue =
      this.ueRepo.create({

        code_ue: dto.code_ue,

        nom_ue: dto.nom_ue,

        credit: dto.credit,

        semestre: dto.semestre,

        niveau,

        has_tp: dto.has_tp,
      });

    return this.ueRepo.save(ue);
  }

  // GET ALL
  findAll() {

    return this.ueRepo.find({

      relations: [
        'niveau',
      ],
    });
  }

  // GET ONE
  findOne(id: number) {

    return this.ueRepo.findOne({

      where: {
        id_ue: id,
      },

      relations: [
        'niveau',
      ],
    });
  }

  // UPDATE
  async update(
    id: number,
    dto: UpdateUeDto,
  ) {

    await this.ueRepo.update(

      id,

      {
        code_ue: dto.code_ue,

        nom_ue: dto.nom_ue,

        credit: dto.credit,

        semestre: dto.semestre,
      },
    );

    return this.findOne(id);
  }

  // DELETE
  remove(id: number) {

    return this.ueRepo.delete(id);
  }
}