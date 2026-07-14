import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { RequeteService } from './requete.service';

import { CreateRequeteDto } from './dto/create-requete.dto';
import { UpdateRequeteDto } from './dto/update-requete.dto';

@Controller('requete')
export class RequeteController {

  constructor(
    private readonly requeteService: RequeteService,
  ) {}

  @Post()
  create(
    @Body()
    createRequeteDto: CreateRequeteDto,
  ) {

    return this
      .requeteService
      .create(createRequeteDto);
  }

  @Get()
  findAll() {

    return this
      .requeteService
      .findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {

    return this
      .requeteService
      .findOne(+id);
  }

  @Patch(':id')
  update(

    @Param('id')
    id: string,

    @Body()
    updateRequeteDto: UpdateRequeteDto,
  ) {

    return this
      .requeteService
      .update(
        +id,
        updateRequeteDto,
      );
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {

    return this
      .requeteService
      .remove(+id);
  }
}