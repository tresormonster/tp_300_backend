import { PartialType } from '@nestjs/swagger';
import { CreateRequeteDto } from './create-requete.dto';

export class UpdateRequeteDto extends PartialType(CreateRequeteDto) {}
