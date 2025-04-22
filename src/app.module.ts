import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './configs/database.config';
import { ProductModule } from './modules/product/product.module';
import { User } from './entities/user/user.entity';
import { Post } from './entities/post/post.entity';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/common/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    PostModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env'],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmModule.forFeature([User, Post]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
