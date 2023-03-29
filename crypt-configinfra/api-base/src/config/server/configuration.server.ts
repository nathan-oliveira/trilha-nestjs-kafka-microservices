import { Api } from './api';

export const configurationServer = async () => {
  const api = new Api();
  const config = await api.getConfig();

  process.env.SERVER_PORT = config.server.port;
  process.env.DB_TYPE = config.db.type;
  process.env.DB_DATABASE = config.db.database;

  if (process.env.NODE_ENV === 'production') {
    process.env.DB_HOST = await api.decrypt(config.db.host);
    process.env.DB_PORT = await api.decrypt(config.db.port);
    process.env.DB_USERNAME = await api.decrypt(config.db.username);
    process.env.DB_PASSWORD = await api.decrypt(config.db.password);
    process.env.DB_SYNCHRONIZE = String(config.db.synchronize);
  } else {
    process.env.DB_HOST = config.db.host;
    process.env.DB_PORT = config.db.port;
    process.env.DB_USERNAME = config.db.username;
    process.env.DB_PASSWORD = config.db.password;
    process.env.DB_SYNCHRONIZE = String(config.db.synchronize);
  }
};
