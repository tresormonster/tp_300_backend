import { PartialType } from '@nestjs/swagger';
import { CreateImportEtudiantDto } from './create-import-etudiant.dto';

export class UpdateImportEtudiantDto extends PartialType(CreateImportEtudiantDto) {}
