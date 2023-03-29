import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeroesEntity } from 'src/heroes/interfaces/heroes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'docker',
      database: 'api-heroes',
      entities: [HeroesEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule { }
