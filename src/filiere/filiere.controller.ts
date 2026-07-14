import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiliereService } from './filiere.service';
import { CreateFiliereDto } from './dto/create-filiere.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';

@Controller('filiere')
export class FiliereController {
  constructor(private readonly filiereService: FiliereService) {}

  @Post()
  create(@Body() createFiliereDto: CreateFiliereDto) {
    return this.filiereService.create(createFiliereDto);
  }

  @Get()
  findAll() {
    return this.filiereService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filiereService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiliereDto: UpdateFiliereDto) {
    return this.filiereService.update(+id, updateFiliereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filiereService.remove(+id);
  }
}
