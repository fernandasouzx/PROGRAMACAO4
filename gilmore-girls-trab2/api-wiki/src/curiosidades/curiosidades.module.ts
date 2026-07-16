import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curiosidade } from './entities/curiosidade.entity';
import { CuriosidadesService } from './curiosidades.service';
import { CuriosidadesController } from './curiosidades.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Curiosidade])],
  controllers: [CuriosidadesController],
  providers: [CuriosidadesService],
})
export class CuriosidadesModule {}
