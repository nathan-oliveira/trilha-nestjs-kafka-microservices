import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  OnModuleInit,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiBody, ApiParam } from '@nestjs/swagger';

import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { Patch } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = ['find-all-user', 'find-user', 'create-user'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  index(): Observable<User[]> {
    return this.client.send('find-all-user', {});
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  find(@Param('id') id: number): Observable<User> {
    return this.client.send('find-user', { id });
  }

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto): Observable<User> {
    return this.client.send('create-user', user);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UserDto })
  update(@Param('id') id: number, @Body() user: UserDto) {
    const payload = { ...user, id };
    return this.client.emit('update-user', payload);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: number) {
    return this.client.emit('delete-user', { id });
  }

  @Patch(':id/inactivate')
  activate(@Param('id') @Param('id') id: number) {
    return this.client.emit('activate-user', { id });
  }

  @Patch(':id/inactivate')
  inactivate(@Param('id') @Param('id') id: number) {
    return this.client.emit('inactivate-user', { id });
  }
}
