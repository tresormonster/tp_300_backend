import { PartialType } from '@nestjs/swagger';
import { CreateAnonymatDto } from './create-anonymat.dto';

export class UpdateAnonymatDto extends PartialType(CreateAnonymatDto) {}
