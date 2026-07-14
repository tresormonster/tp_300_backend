import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
} from '@nestjs/common';

import { AnonymatService } from './anonymat.service';

@Controller('anonymat')
export class AnonymatController {

  constructor(
    private readonly anonymatService: AnonymatService,
  ) {}

  @Post('generer/:idUe')
  generer(
    @Param('idUe') idUe: number,
  ) {
    return this.anonymatService.genererAnonymats(
      Number(idUe),
    );
  }

  @Get()
  findAll() {
    return this.anonymatService.findAll();
  }

  @Post('generer-rattrapage/:idUe')
genererRattrapage(
  @Param('idUe') idUe: string,
) {

  return this
    .anonymatService
    .genererAnonymatsRattrapage(
      +idUe,
    );
}

@Get('ue/:idUe/:rattrapage')
listeParUe(

  @Param('idUe')
  idUe: string,

  @Param('rattrapage')
  rattrapage: string,
) {

  return this.anonymatService.listeParUe(

    +idUe,

    rattrapage == 'true',
  );
}



@Delete(
  'ue/:idUe/:rattrapage',
)
supprimerParUe(

  @Param('idUe')
  idUe: string,

  @Param('rattrapage')
  rattrapage: string,
) {

  return this.anonymatService
      .supprimerParUe(

    +idUe,

    rattrapage == 'true',
  );
}
}