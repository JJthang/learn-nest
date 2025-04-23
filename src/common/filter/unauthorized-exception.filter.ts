// unauthorized-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

// Xử lý Global   nếu bạn muốn áp dụng toàn bộ
// Tạo Global Filter cho UnauthorizedException
// @Catch(UnauthorizedException): Filter này sẽ bắt tất cả lỗi thuộc loại UnauthorizedException.
@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  // ArgumentsHost: là context truyền vào cho filter, cho phép bạn lấy thông tin HTTP request/response.
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    // host.switchToHttp(): lấy context HTTP (NestJS có thể dùng với WebSocket, RPC... nên cần chuyển đổi context).
    const ctx = host.switchToHttp();
    // ExpressResponse: kiểu của response trong ExpressJS, vì NestJS có thể chạy trên nền Express.
    // getResponse(): lấy đối tượng response để trả dữ liệu về cho client.
    const response = ctx.getResponse<ExpressResponse>();

    const message = exception.message;
    // HttpStatus: để sử dụng các mã HTTP có sẵn
    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: message.includes('expired')
        ? 'Token expired please login again'
        : message,
    });
  }
}
