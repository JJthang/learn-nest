import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from 'src/entities/product/product.entity';
import { User } from 'src/entities/user/user.entity';
import { Profile } from 'src/entities/profile/profile.entity';
import { Post } from 'src/entities/post/post.entity';
import { AuthModule } from 'src/modules/common/auth/auth.module';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [Product, User, Profile, Post, AuthModule],
    synchronize: true,
  }),
  // __dirname + '/**/*.entity{.ts,.js}',
  inject: [ConfigService],
};
