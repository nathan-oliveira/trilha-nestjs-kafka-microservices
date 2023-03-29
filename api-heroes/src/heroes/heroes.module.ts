import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DatabaseModule } from 'src/database/database.module';

import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { HeroesEntity } from './interfaces/heroes.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([HeroesEntity])],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule { }
