import { PartialType } from '@nestjs/swagger';
import { CreateUeDto } from './create-ue.dto';

export class UpdateUeDto extends PartialType(CreateUeDto) {}
