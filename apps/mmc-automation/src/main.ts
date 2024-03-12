import { webTranslatorProcessors } from '@backend/web-translator-automation';


import {
  AxonApplication,
  configLogger,
  ClientIdentification,
  credentials,
} from '@ebd-connect/cqrs-framework';

const isProduction = false;
const env = {
  PORT: 3104,
  HOST: 'localhost',
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
  processors: [
    //automation processors
    ...webTranslatorProcessors, //processor

  ],
  connection: {
    serviceClientInit: {
      address: env.AXON_HOST,
      credentials: credentials.createInsecure(),
    },
    clientIdentification: new ClientIdentification()
      .setComponentName('mmc-automation')
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
  eventProcessor: { queueHandlers: true },
});
axonConnector.connect();

