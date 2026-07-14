import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnseignantService } from './enseignant.service';
import { CreateEnseignantDto } from './dto/create-enseignant.dto';
import { UpdateEnseignantDto } from './dto/update-enseignant.dto';

@Controller('enseignant')
export class EnseignantController {
  constructor(private readonly enseignantService: EnseignantService) {}

  @Post()
  create(@Body() createEnseignantDto: CreateEnseignantDto) {
    return this.enseignantService.create(createEnseignantDto);
  }

  @Get()
  findAll() {
    return this.enseignantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enseignantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnseignantDto: UpdateEnseignantDto) {
    return this.enseignantService.update(+id, updateEnseignantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enseignantService.remove(+id);
  }
}
