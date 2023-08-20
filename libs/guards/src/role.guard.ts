import { MetadataKey } from '@app/constants';
import { Roles } from '@app/enums';
import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import { UserService } from 'src/apis/user/services/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(
      MetadataKey.ROLE,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserEntity;
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Permission deny');
    }
    return true;
  }
}
