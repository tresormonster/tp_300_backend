import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NiveauService } from './niveau.service';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';

@Controller('niveaux')
export class NiveauController {

  constructor(private readonly niveauService: NiveauService) {}

  // ➕ CREATE
  @Post()
  create(@Body() dto: CreateNiveauDto) {
    return this.niveauService.create(dto);
  }

  // 📥 GET ALL
  @Get()
  findAll() {
    return this.niveauService.findAll();
  }


  @Get('filiere/:idFiliere')
findByFiliere(
  @Param('idFiliere')
  idFiliere: string,
) {

  return this.niveauService
    .findByFiliere(
      +idFiliere,
    );
}

  // 📥 GET ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.niveauService.findOne(+id);
  }

  // ✏️ UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNiveauDto) {
    return this.niveauService.update(+id, dto);
  }

  // ❌ DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.niveauService.remove(+id);
  }
}