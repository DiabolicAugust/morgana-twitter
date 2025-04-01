import { PartialType } from '@nestjs/mapped-types';
import { CreateChronicleLikeDto } from './create-chronicle-like.dto';

export class UpdateChronicleLikeDto extends PartialType(CreateChronicleLikeDto) {}
