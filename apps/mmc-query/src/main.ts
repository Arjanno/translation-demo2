import {
  AxonApplication,
  configLogger,
  ClientIdentification,
  credentials,
} from '@ebd-connect/cqrs-framework';

const isProduction = false;
const env = {
  AXON_HOST: 'localhost:8124',

  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_USER: 'postgres',
  DB_PASSWORD: 'postgrespassword',
  DB_NAME: 'postgres',
  DB_LOGGING: false,
};

configLogger();

const axonConnector = new AxonApplication({
  queryHandlers: [
    //queryHandlers
  ],
  connection: {
    serviceClientInit: {
      address: env.AXON_HOST,
      credentials: credentials.createInsecure(),
    },
    clientIdentification: new ClientIdentification()
      .setComponentName('mmc-query')
      .setClientId(isProduction ? crypto.randomUUID() : 'local'),
    forceStayOnSameConnection: !isProduction,
  },
  database: {
    postgres: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      logging: env.DB_LOGGING,
    },
  },
});
axonConnector.connect();

