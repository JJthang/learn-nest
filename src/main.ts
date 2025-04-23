import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from './common/filter/unauthorized-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      dismissDefaultMessages: false,
    }),
  );
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
