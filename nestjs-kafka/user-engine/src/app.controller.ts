import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-users')
  async index(): Promise<UserEntity[]> {
    return this.appService.findAll();
  }

  @MessagePattern('find-users')
  async find(@Payload() data: any): Promise<User> {
    return this.appService.find(Number(data.value.id));
  }

  @MessagePattern('create-user')
  async create(@Payload() data: any): Promise<UserEntity> {
    return await this.appService.create(data.value);
  }

  @MessagePattern('update-user')
  async update(@Payload() data: any): Promise<void> {
    return await this.appService.update(data.value);
  }

  @MessagePattern('delete-user')
  async remove(@Payload() data: any): Promise<void> {
    return await this.appService.delete(Number(data.value.id));
  }

  @MessagePattern('activate-user')
  async activate(@Payload() data: any): Promise<void> {
    return await this.appService.activate(Number(data.value.id));
  }

  @MessagePattern('inactivate-user')
  async inactivate(@Payload() data: any): Promise<void> {
    return await this.appService.inactivate(Number(data.value.id));
  }
}
