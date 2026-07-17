import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

    return this.requeteService.create(
      createRequeteDto,
    );
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor(
      'files',
      10,
      {
        storage: diskStorage({
          destination: './uploads/requetes',
          filename: (req, file, cb) => {

            const uniqueName =
              Date.now() +
              '-' +
              Math.round(
                Math.random() * 1000000,
              ) +
              extname(file.originalname);

            cb(
              null,
              uniqueName,
            );
          },
        }),
      },
    ),
  )
  uploadFiles(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {

    console.log(
      "FICHIERS RECUS :",
    );

    console.log(files);

    return files.map(

      (f) =>

        '/uploads/requetes/' +

        f.filename,
    );
  }

  @Get()
  findAll() {

    return this.requeteService.findAll();
  }

  @Get('etudiant/:id')
  requetesEtudiant(
    @Param('id')
    id: string,
  ) {

    return this.requeteService
        .requetesEtudiant(
          +id,
        );
  }

  @Patch('repondre/:id')
  repondre(

    @Param('id')
    id: string,

    @Body('reponse')
    reponse: string,

    @Body('statut')
    statut: string,
  ) {

    return this.requeteService
        .repondre(
          +id,
          reponse,
          statut,
        );
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {

    return this.requeteService
        .findOne(
          +id,
        );
  }

  @Patch(':id')
  update(

    @Param('id')
    id: string,

    @Body()
    updateRequeteDto: UpdateRequeteDto,
  ) {

    return this.requeteService.update(
      +id,
      updateRequeteDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {

    return this.requeteService.remove(
      +id,
    );
  }




  @Get('enseignant/:id')
requetesEnseignant(
  @Param('id')
  id: string,
) {

  return this.requeteService
      .requetesEnseignant(
        +id,
      );
}
}