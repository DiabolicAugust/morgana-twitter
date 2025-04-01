import { Controller, Post, Param, UseGuards, Request } from '@nestjs/common';
import { ChronicleLikeService } from './chronicle-like.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { PayloadDto } from '../authorization/dto/payload.dto';

@Controller('chronicle-like')
export class ChronicleLikeController {
  constructor(private readonly chronicleLikeService: ChronicleLikeService) {}

  @Post('/:chronicleId')
  @UseGuards(JwtAuthGuard)
  create(@Param('chronicleId') chronicleId: string, @Request() req: Request) {
    const user: PayloadDto = req['user'];
    return this.chronicleLikeService.addRemoveLike(chronicleId, user.id);
  }
}
