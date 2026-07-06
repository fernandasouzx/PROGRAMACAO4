import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './db/database.sqlite',
  synchronize: true,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
};