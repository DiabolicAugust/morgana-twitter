import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLegendCommentDto } from './dto/create-legend-comment.dto';
import { UpdateLegendCommentDto } from './dto/update-legend-comment.dto';
import { PrismaService } from '../prisma.service';
import { Strings } from '../data/strings';
import { Entities, Fields } from '../data/enums/strings.enum';

@Injectable()
export class LegendCommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createLegendCommentDto: CreateLegendCommentDto,
    userId: string,
    legendId: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      throw new UnauthorizedException(
        Strings.noEntityWithField(Entities.USER, Fields.ID, userId),
      );

    const legend = await this.prisma.legend.findUnique({
      where: { id: legendId },
    });

    if (!legend)
      throw new NotFoundException(
        Strings.noEntityWithField(Entities.LEGEND, Fields.ID, legendId),
      );

    const comment = await this.prisma.legendComment.create({
      data: {
        userId: user.id,
        text: createLegendCommentDto.text,
        legendId: legend.id,
      },
    });

    return {
      data: comment,
    };
  }

  async createReply(
    createLegendCommentDto: CreateLegendCommentDto,
    userId: string,
    legendId: string,
    commentId: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      throw new UnauthorizedException(
        Strings.noEntityWithField(Entities.USER, Fields.ID, userId),
      );

    const legend = await this.prisma.legend.findUnique({
      where: { id: legendId },
    });

    if (!legend)
      throw new NotFoundException(
        Strings.noEntityWithField(Entities.LEGEND, Fields.ID, legendId),
      );

    const comment = await this.prisma.legendComment.findUnique({
      where: { id: commentId },
    });

    if (!comment)
      throw new NotFoundException(
        Strings.noEntityWithField(Entities.COMMENT, Fields.ID, commentId),
      );

    const reply = await this.prisma.legendComment.create({
      data: {
        userId: user.id,
        replyToId: comment.id,
        text: createLegendCommentDto.text,
        legendId: legend.id,
      },
    });

    return {
      data: reply,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} legendComment`;
  }

  update(id: number, updateLegendCommentDto: UpdateLegendCommentDto) {
    return `This action updates a #${id} legendComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} legendComment`;
  }
}
