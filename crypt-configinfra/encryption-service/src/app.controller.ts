import { Controller, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { EncryptionDto } from './dtos/encryption.dto';
import { EncryptionInterface } from './interfaces/encryption.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('encrypt')
  async encrypt(
    @Body() encryptText: EncryptionDto,
  ): Promise<EncryptionInterface> {
    return await this.appService.encrypt(encryptText.text);
  }

  @Post('decrypt')
  async decrypt(
    @Body() encryptedText: EncryptionDto,
  ): Promise<EncryptionInterface> {
    return await this.appService.decrypt(encryptedText.text);
  }
}
