import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UeService } from './ue.service';
import { CreateUeDto } from './dto/create-ue.dto';
import { UpdateUeDto } from './dto/update-ue.dto';

@Controller('ue')
export class UeController {
  constructor(private readonly ueService: UeService) {}

  @Post()
  create(@Body() createUeDto: CreateUeDto) {
    return this.ueService.create(createUeDto);
  }

  @Get()
  findAll() {
    return this.ueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUeDto: UpdateUeDto) {
    return this.ueService.update(+id, updateUeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ueService.remove(+id);
  }
}
