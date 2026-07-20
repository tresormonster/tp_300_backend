import { Injectable } from '@nestjs/common';
import { CreateImportEtudiantDto } from './dto/create-import-etudiant.dto';
import { UpdateImportEtudiantDto } from './dto/update-import-etudiant.dto';

@Injectable()
export class ImportEtudiantService {
  create(createImportEtudiantDto: CreateImportEtudiantDto) {
    return 'This action adds a new importEtudiant';
  }

  findAll() {
    return `This action returns all importEtudiant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importEtudiant`;
  }

  update(id: number, updateImportEtudiantDto: UpdateImportEtudiantDto) {
    return `This action updates a #${id} importEtudiant`;
  }

  remove(id: number) {
    return `This action removes a #${id} importEtudiant`;
  }
}
