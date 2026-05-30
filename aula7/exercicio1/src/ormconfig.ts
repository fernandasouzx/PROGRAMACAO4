import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'sqlite3',
  database: './db.sqlite3',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
}; 