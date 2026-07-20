import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportEtudiantService } from './import-etudiant.service';
import { CreateImportEtudiantDto } from './dto/create-import-etudiant.dto';
import { UpdateImportEtudiantDto } from './dto/update-import-etudiant.dto';

@Controller('import-etudiant')
export class ImportEtudiantController {
  constructor(private readonly importEtudiantService: ImportEtudiantService) {}

  @Post()
  create(@Body() createImportEtudiantDto: CreateImportEtudiantDto) {
    return this.importEtudiantService.create(createImportEtudiantDto);
  }

  @Get()
  findAll() {
    return this.importEtudiantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importEtudiantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportEtudiantDto: UpdateImportEtudiantDto) {
    return this.importEtudiantService.update(+id, updateImportEtudiantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importEtudiantService.remove(+id);
  }
}
