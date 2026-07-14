import {

  Controller,

  Post,

  Get,

  Body,

  Param,

  Patch,

  Delete,

  UseGuards,

} from '@nestjs/common';

import { AuthGuard }
from '@nestjs/passport';

import { EtudiantService }
from './etudiant.service';

import { CreateEtudiantDto }
from './dto/create-etudiant.dto';

@Controller('etudiants')

export class EtudiantController {

  constructor(

    private readonly etudiantService:
        EtudiantService,
  ) {}

  // 🔥 CREATE
  @Post()

  create(
    @Body() dto: CreateEtudiantDto,
  ) {

    return this.etudiantService.create(
      dto,
    );
  }

  // 🔥 GET ALL PROTEGE
  @Get()

  @UseGuards(AuthGuard('jwt'))

  findAll() {

    return this.etudiantService.findAll();
  }

  // 🔥 GET ONE PROTEGE
  @Get(':id')

  @UseGuards(AuthGuard('jwt'))

  findOne(
    @Param('id') id: number,
  ) {

    return this.etudiantService.findOne(
      id,
    );
  }

  // 🔥 UPDATE PROTEGE
  @Patch(':id')

  @UseGuards(AuthGuard('jwt'))

  update(

    @Param('id') id: number,

    @Body() dto: any,
  ) {

    return this.etudiantService.update(
      id,
      dto,
    );
  }

  // 🔥 DELETE PROTEGE
  @Delete(':id')

  @UseGuards(AuthGuard('jwt'))

  remove(
    @Param('id') id: number,
  ) {

    return this.etudiantService.remove(
      id,
    );
  }




@Post('activation')
activation(
  @Body() dto: any,
) {

  return this.etudiantService.activation(
    dto,
  );
}

}