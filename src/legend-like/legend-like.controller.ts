import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LegendLikeService } from './legend-like.service';
import { CreateLegendLikeDto } from './dto/create-legend-like.dto';
import { UpdateLegendLikeDto } from './dto/update-legend-like.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { PayloadDto } from '../authorization/dto/payload.dto';

@Controller('legend-like')
export class LegendLikeController {
  constructor(private readonly legendLikeService: LegendLikeService) {}

  @Post('/:legendId')
  @UseGuards(JwtAuthGuard)
  create(@Param('legendId') legendId: string, @Request() req: Request) {
    const user: PayloadDto = req['user'];
    console.log(legendId);
    return this.legendLikeService.addRemoveLike(legendId, user.id);
  }
}
