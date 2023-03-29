import { ApiProperty } from '@nestjs/swagger';

export class HeroesDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  power: string;
}
