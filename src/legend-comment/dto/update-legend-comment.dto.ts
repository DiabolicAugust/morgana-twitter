import { PartialType } from '@nestjs/mapped-types';
import { CreateLegendCommentDto } from './create-legend-comment.dto';

export class UpdateLegendCommentDto extends PartialType(CreateLegendCommentDto) {}
