import { PartialType } from '@nestjs/mapped-types';
import { CreateLegendLikeDto } from './create-legend-like.dto';

export class UpdateLegendLikeDto extends PartialType(CreateLegendLikeDto) {}
