import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@anchan828/nest-sendgrid';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModel } from './interfaces/notification.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    MongooseModule.forRoot('mongodb://localhost/notification'),
    MongooseModule.forFeature([NotificationModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
