import { webTranslatorCommandHandlers } from '@backend/web-translator-core';

import {
  AxonApplication,
  ClientIdentification,
  configLogger,
  credentials,
} from '@ebd-connect/cqrs-framework';

const isProduction = false;
const AXON_HOST = process.env.AXON_HOST ?? 'localhost:8124';
//axon connector
configLogger();
const axonConnector = new AxonApplication({
  commandHandlers: [
    // contextCommandHandlers
    ...webTranslatorCommandHandlers,

  ],
  connection: {
    serviceClientInit: {
      address: AXON_HOST,
      credentials: credentials.createInsecure(),
    },
    clientIdentification: new ClientIdentification()
      .setComponentName('mmc-command')
      .setClientId(isProduction ? crypto.randomUUID() : 'local'),
    forceStayOnSameConnection: !isProduction,
  },
});
axonConnector.connect();

