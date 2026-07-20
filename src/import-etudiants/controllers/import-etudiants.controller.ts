import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

import { ImportEtudiantsService } from '../services/import-etudiants.service';
import { Get, Delete, Param } from '@nestjs/common';

@ApiTags('Importer des étudiants')

@Controller('admin')
export class ImportEtudiantsController {

  constructor(
    private readonly importService: ImportEtudiantsService,
  ) {}

  @Post('import-etudiants')

  @ApiConsumes('multipart/form-data')

  @ApiBody({
    schema: {
      type: 'object',
      properties: {

        file: {
          type: 'string',
          format: 'binary',
        },

        filiere: {
          type: 'string',
        },

        niveau: {
          type: 'string',
        },
      },
    },
  })

  @UseInterceptors(
    FileInterceptor('file'),
  )

  async importExcel(

    @UploadedFile()
    file: {
      buffer: Buffer;
      originalname: string;
    },

    @Body('cycle')
cycle: string,

@Body('filiere')
filiere: string,

@Body('niveau')
niveau: string,
  ) {

    console.log('Cycle:', cycle);
    console.log('Filiere:', filiere);
    console.log('Niveau:', niveau);
    console.log('File:', file?.originalname);

    return this.importService.importExcel(
  file,
  cycle,
  filiere,
  niveau,
);
  }


  @Get('import-etudiants')
async getHistorique() {
  return this.importService.getHistorique();
}

@Delete('import-etudiants/:id')
async supprimerImport(
  @Param('id') id: number,
) {
  return this.importService.supprimerImport(Number(id));
}
}