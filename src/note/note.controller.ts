import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Res } from '@nestjs/common';
import type { Response } from 'express';


@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }


@Get('cc/:idUe')
listeCC(

  @Param('idUe')
  idUe: string,
) {

  return this.noteService.listeCC(
    +idUe,
  );
}






@Post('cc')
enregistrerCC(
  @Body()
  notes: CreateNoteDto[],
) {

  return this.noteService.enregistrerCC(
    notes,
  );
}



@Post('tp')
enregistrerTP(

  @Body()
  notes: CreateNoteDto[],
) {

  return this.noteService.enregistrerTP(
    notes,
  );
}


@Get('tp/:idUe')
listeTP(

  @Param('idUe')
  idUe: string,
) {

  return this.noteService.listeTP(
    +idUe,
  );
}



@Get('sn/:idUe')
listeSN(

  @Param('idUe')
  idUe: string,
) {

  return this.noteService.listeSN(
    +idUe,
  );
}

@Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
  @Post('publier/:id')
 publier(
  @Param('id') id: string,
  ) {
  return this.noteService.publier(
    +id,
  );
   }

   @Get('etudiant/:idEtudiant')
notesEtudiant(
  @Param('idEtudiant')
  idEtudiant: string,
) {

  return this.noteService.notesEtudiant(
    +idEtudiant,
  );
}


@Post('sn')
enregistrerSN(

  @Body()
  notes: CreateNoteDto[],
) {

  return this.noteService.enregistrerSN(
    notes,
  );
}



@Get('rattrapage/:idUe')
listeRattrapage(

  @Param('idUe')
  idUe: string,
) {

  return this.noteService.listeRattrapage(
    +idUe,
  );
}


@Post('rattrapage')
enregistrerRattrapage(

  @Body()
  notes: CreateNoteDto[],
) {

  return this.noteService.enregistrerRattrapage(
    notes,
  );
}


@Post('publier-ue/:idUe')
publierUe(

  @Param('idUe')
  idUe: string,
) {

  return this.noteService.publierUe(

    +idUe,
  );
}

@Get('bulletin/:idEtudiant')
telechargerBulletin(
  @Param('idEtudiant') idEtudiant: string,
  @Res() res: Response,
) {
  return this.noteService.genererBulletin(
    +idEtudiant,
    res,
  );
}

}
