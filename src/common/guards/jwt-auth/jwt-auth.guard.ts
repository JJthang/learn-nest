import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    // Gọi super() để khởi tạo AuthGuard gốc.
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    // Kiểm tra xem handler hoặc controller có metadata IS_PUBLIC_KEY không:
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // Nếu route được đánh dấu là public -> cho phép luôn:
    if (isPublic) {
      return true;
    }
    // Ngược lại, chạy tiếp logic xác thực JWT của AuthGuard gốc:
    return super.canActivate(context) as boolean;
  }
}
