import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { EncryptionInterface } from './interfaces/encryption.interfaces';

@Injectable()
export class AppService {
  private masterKey = '67a3d271u23h23a23hd23a82da32ad7ad7';

  async encrypt(text: string): Promise<EncryptionInterface> {
    const iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(64);
    const key = crypto.pbkdf2Sync(this.masterKey, salt, 2145, 32, 'sha512');
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf-8'),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    const response: EncryptionInterface = {
      text: Buffer.concat([salt, iv, tag, encrypted]).toString('base64'),
    };

    return response;
  }

  async decrypt(textData: string): Promise<EncryptionInterface> {
    const bData = Buffer.from(textData, 'base64');

    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const tag = bData.slice(80, 96);
    const text = bData.slice(96);
    const key = crypto.pbkdf2Sync(this.masterKey, salt, 2145, 32, 'sha512');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    const decryptedText = decipher.update(text) + decipher.final('utf-8');
    const response: EncryptionInterface = {
      text: decryptedText,
    };
    return response;
  }
}
