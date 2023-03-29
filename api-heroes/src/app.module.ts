import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [DatabaseModule, HeroesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
