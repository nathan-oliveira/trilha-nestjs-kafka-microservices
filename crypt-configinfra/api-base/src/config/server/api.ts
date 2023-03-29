import axios from 'axios';

import { EncryptionDto } from './dtos/encryption.dto';
import { ConfigurationInterface } from './interfaces/encryption.interface';

export class Api {
  private encryption = axios.create({
    baseURL: process.env.BASE_URL_ENCRYPTION,
  });

  private configServer = axios.create({
    baseURL: process.env.URL_CONFIG_SERVER,
  });

  async decrypt(text: string): Promise<string> {
    const { data } = await this.encryption.post('/decrypt', {
      text,
    } as EncryptionDto);
    return data.text;
  }

  async getConfig(): Promise<ConfigurationInterface> {
    const { data } = await this.configServer.get(
      `/configuration?enviroment=${process.env.NODE_ENV}`,
    );

    return data;
  }
}
