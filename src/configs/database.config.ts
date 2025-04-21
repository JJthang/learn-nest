import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from 'src/entities/product/product.entity';
import { User } from 'src/entities/user/user.entity';
import { Profile } from 'src/entities/profile/profile.entity';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [Product, User, Profile],
    synchronize: true,
  }),
  // __dirname + '/**/*.entity{.ts,.js}',
  inject: [ConfigService],
};
