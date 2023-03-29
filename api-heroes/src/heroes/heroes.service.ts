import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { HeroesDto } from './dtos/heroes.dto';
import { HeroesEntity } from './interfaces/heroes.entity';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(HeroesEntity)
    private readonly heroesRepository: Repository<HeroesEntity>,
  ) { }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<HeroesEntity>> {
    const queryBuilder = this.heroesRepository.createQueryBuilder('h');
    queryBuilder
      .select(['h.id', 'h.name', 'h.power', 'h.created_at', 'h.updated_at'])
      .orderBy('h.id', 'ASC');

    return paginate<HeroesEntity>(queryBuilder, options);
  }

  async create(hero: HeroesDto): Promise<HeroesEntity> {
    return await this.heroesRepository.save(hero);
  }
}
