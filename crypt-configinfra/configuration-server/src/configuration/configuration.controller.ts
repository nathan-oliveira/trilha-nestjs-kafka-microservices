import { Controller, Get, Query } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationInterface } from './interfaces/configurations.interfaces';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) { }

  @Get()
  async getConfiguration(
    @Query('enviroment') enviroment: string,
  ): Promise<ConfigurationInterface> {
    return await this.configurationService.getConfiguration(enviroment);
  }
}
