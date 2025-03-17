import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Strings } from '../data/strings';
import { Entities, Fields } from '../data/enums/strings.enum';

@Injectable()
export class LegendLikeService {
  constructor(private readonly prisma: PrismaService) {}

  async addRemoveLike(legendId: string, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      throw new UnauthorizedException(
        Strings.noEntityWithField(Entities.USER, Fields.ID, userId),
      );

    const legend = await this.prisma.legend.findUnique({
      where: { id: legendId },
    });

    if (!legend)
      throw new UnauthorizedException(
        Strings.noEntityWithField(Entities.LEGEND, Fields.ID, legendId),
      );

    const legendLike = await this.prisma.legendLike.findUnique({
      where: {
        legendId_userId: { legendId: legendId, userId: userId },
      },
    });

    if (legendLike) {
      const deletedLegendLike = await this.prisma.legendLike.delete({
        where: {
          legendId_userId: { legendId: legendId, userId: userId },
        },
      });
      return {
        action: Strings.delete,
        daat: deletedLegendLike,
      };
    } else {
      const createdLegendLike = await this.prisma.legendLike.create({
        data: { userId, legendId },
      });
      return {
        action: Strings.create,
        daat: createdLegendLike,
      };
    }
  }
}
