import { webTranslatorCommandHandlers } from '@backend/web-translator-core';

import {
  AxonApplication,
  ClientIdentification,
  configLogger,
  credentials,
} from '@ebd-connect/cqrs-framework';

const isProduction = false;
configLogger();

const axonConnector = new AxonApplication({
  commandHandlers: [
    // contextCommandHandlers
    ...webTranslatorCommandHandlers,
  ],
  connection: {
    serviceClientInit: {
      address: process.env.AXON_HOST ?? 'localhost:8124',
      credentials: credentials.createInsecure(),
    },
    clientIdentification: new ClientIdentification()
      .setComponentName('mmc-command')
      .setClientId(isProduction ? crypto.randomUUID() : 'local'),
    forceStayOnSameConnection: !isProduction,
  },
});
axonConnector.connect().catch((error) => console.error(error.message));

