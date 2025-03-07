import { PartialType } from '@nestjs/mapped-types';
import { CreateLegendDto } from './create-legend.dto';

export class UpdateLegendDto extends PartialType(CreateLegendDto) {}
