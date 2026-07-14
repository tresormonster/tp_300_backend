import { PartialType }
from '@nestjs/swagger';

import { CreateEnseignementDto }
from './create-enseignement.dto';

export class UpdateEnseignementDto
extends PartialType(
  CreateEnseignementDto,
) {}