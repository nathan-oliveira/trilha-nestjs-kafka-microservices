import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Client, TextContent, IMessage } from '@zenvia/sdk';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NotificationModel } from './interfaces/notification.schema';
import { Notification } from './interfaces/notification.interface';
import { NotificationDto } from './dtos/notification.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly sendGrid: SendGridService,
    @InjectModel(NotificationModel.name)
    private readonly notificationModel: Model<Notification>,
  ) { }

  private client = new Client(process.env.ZENVIA_TOKEN);

  async sendEmail(userId: number, email: string, name: string): Promise<void> {
    await this.sendGrid
      .send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'User Created',
        text: `Hello ${name}, your user created with success!`,
        html: `<strong>Hello ${name}, your user created with success!</strong>`,
      })
      .then(async (resp) => {
        await this.createMongoNotification(userId, 'email', resp, 'SUCCESS');
      })
      .catch(async (error) => {
        await this.createMongoNotification(userId, 'email', error, 'ERROR');
      });
  }

  async sendSMS(userId: number, phone: string, name: string): Promise<void> {
    const smsClient = this.client.getChannel('sms');
    const content = new TextContent(
      `Hello ${name}, your user created with success!`,
    );

    await smsClient
      .sendMessage(process.env.ZENVIA_KEYWORD, phone, content)
      .then(async (resp: IMessage) => {
        const { channel, contents, from, to, direction, id: messageId } = resp;
        const newResp = {
          channel,
          contents,
          from,
          to,
          direction,
          messageId,
        };

        await this.createMongoNotification(userId, 'sms', newResp, 'SUCCESS');
      })
      .catch(async (error) => {
        await this.createMongoNotification(userId, 'sms', error, 'ERROR');
      });
  }

  private async createMongoNotification(
    userId: number,
    type: 'sms' | 'email',
    response: any,
    status: 'SUCCESS' | 'ERROR',
  ): Promise<void> {
    const notification: NotificationDto = {
      userId,
      type,
      response,
      status,
    };

    const createNotification = new this.notificationModel(notification);
    await createNotification.save();
  }
}
