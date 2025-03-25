import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { LegendCommentService } from './legend-comment.service';
import { CreateLegendCommentDto } from './dto/create-legend-comment.dto';
import { UpdateLegendCommentDto } from './dto/update-legend-comment.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { PayloadDto } from '../authorization/dto/payload.dto';

@Controller('legend-comment')
export class LegendCommentController {
  constructor(private readonly legendCommentService: LegendCommentService) {}

  @Post('/legend/:legendId/comment/')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(
    @Body() createLegendCommentDto: CreateLegendCommentDto,
    @Param('legendId') legendId: string,
    @Request() req: Request,
  ) {
    const userPayload: PayloadDto = req['user'];
    return this.legendCommentService.create(
      createLegendCommentDto,
      userPayload.id,
      legendId,
    );
  }

  @Post('/legend/:legendId/comment/:commentId/reply')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createReply(
    @Body() createLegendCommentDto: CreateLegendCommentDto,
    @Param('legendId') legendId: string,
    @Param('commentId') commentId: string,
    @Request() req: Request,
  ) {
    const userPayload: PayloadDto = req['user'];
    return this.legendCommentService.createReply(
      createLegendCommentDto,
      userPayload.id,
      legendId,
      commentId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.legendCommentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLegendCommentDto: UpdateLegendCommentDto,
  ) {
    return this.legendCommentService.update(+id, updateLegendCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.legendCommentService.remove(+id);
  }
}
