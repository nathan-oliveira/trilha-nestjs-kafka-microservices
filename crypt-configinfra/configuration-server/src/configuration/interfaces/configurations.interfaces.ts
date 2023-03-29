export interface ConfigurationInterface {
  server: { port: string };
  db: {
    type: string;
    port: string;
    database: string;
    host: string;
    username: string;
    password: string;
    synchronize: boolean;
  };
}
