import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserPayload } from 'src/types/common/auth.type';

interface RequestWithUser extends Request {
  user: UserPayload;
}
// Custom guard kiểm tra quyền truy cập (authorization)
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const user = context.switchToHttp().getRequest<RequestWithUser>().user;
    console.log('requiredRoles : ', requiredRoles);

    const hasRequiredRole = requiredRoles.some((role) => user.role == role);
    if (!hasRequiredRole) {
      throw new UnauthorizedException('Your account does not have permission');
    }
    return hasRequiredRole;
  }
}
