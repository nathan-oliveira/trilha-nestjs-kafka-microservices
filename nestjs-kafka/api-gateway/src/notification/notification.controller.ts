import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Body, Controller, Post } from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { PhoneDto } from './dto/phone.dto';

@Controller('notification')
export class NotificationController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  @Post('email')
  sendEmail(@Body() data: EmailDto) {
    return this.client.emit('notification-email', data);
  }

  @Post('sms')
  sendPhone(@Body() data: PhoneDto) {
    return this.client.emit('notification-sms', data);
  }
}
