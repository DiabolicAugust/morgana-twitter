//TODO: Find an appropriate name for the file

import { ForbiddenException } from '@nestjs/common';
import { Strings } from '../data/strings';

export class HelperService {
  checkPermissions(ownerId: string, requestorId: string): void {
    if (ownerId !== requestorId) {
      throw new ForbiddenException(Strings.notAllowedToDoIt);
    }
  }
}
