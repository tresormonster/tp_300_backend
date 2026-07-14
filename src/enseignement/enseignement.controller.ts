import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnseignementService } from './enseignement.service';
import { CreateEnseignementDto } from './dto/create-enseignement.dto';
import { UpdateEnseignementDto } from './dto/update-enseignement.dto';

@Controller('enseignements')
export class EnseignementController {

  constructor(private readonly enseignementService: EnseignementService) {}

  // ➕ CREATE
  @Post()
  create(@Body() dto: CreateEnseignementDto) {
    return this.enseignementService.create(dto);
  }

  // 📥 GET ALL
  @Get()
  findAll() {
    return this.enseignementService.findAll();
  }



  @Get('enseignant/:idEnseignant')
uesEnseignant(

  @Param('idEnseignant')
  idEnseignant: string,
) {

  return this.enseignementService
      .uesEnseignant(

    +idEnseignant,
  );
}

  // 📥 GET ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enseignementService.findOne(+id);
  }

  // ✏️ UPDATE
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEnseignementDto,
  ) {
    return this.enseignementService.update(+id, dto);
  }

  // ❌ DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enseignementService.remove(+id);
  }
}