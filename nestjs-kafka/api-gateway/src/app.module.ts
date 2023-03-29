import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [UsersModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
