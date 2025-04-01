import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Strings } from '../data/strings';
import { Entities, Fields } from '../data/enums/strings.enum';

@Injectable()
export class ChronicleLikeService {
  constructor(private readonly prisma: PrismaService) {}

  async addRemoveLike(chronicleId: string, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      throw new UnauthorizedException(
        Strings.noEntityWithField(Entities.USER, Fields.ID, userId),
      );

    const chronicle = await this.prisma.chronicle.findUnique({
      where: { id: chronicleId },
    });

    if (!chronicle)
      throw new NotFoundException(
        Strings.noEntityWithField(Entities.CHRONICLE, Fields.ID, chronicleId),
      );

    const chronicleLike = await this.prisma.chronicleLike.findUnique({
      where: {
        chronicleId_userId: { chronicleId: chronicleId, userId: userId },
      },
    });

    if (chronicleLike) {
      const deletedChronicleLike = await this.prisma.chronicleLike.delete({
        where: {
          chronicleId_userId: { chronicleId: chronicleId, userId: userId },
        },
      });
      return {
        action: Strings.delete,
        daat: deletedChronicleLike,
      };
    } else {
      const createdChronicleLike = await this.prisma.chronicleLike.create({
        data: { userId, chronicleId },
      });
      return {
        action: Strings.create,
        daat: createdChronicleLike,
      };
    }
  }
}
