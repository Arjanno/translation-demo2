import express from 'express';
import {
  AxonApplication,
  ClientIdentification,
  configLogger,
  credentials,
  logger,
  messageBus,
} from '@ebd-connect/cqrs-framework';

import cors from 'cors';

const isProduction = false;
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3100;
const AXON_HOST = process.env.AXON_HOST ?? 'localhost:8124';
//axon connector
configLogger();

const axonConnector = new AxonApplication({
  connection: {
    serviceClientInit: {
      address: AXON_HOST,
      credentials: credentials.createInsecure(),
    },
    clientIdentification: new ClientIdentification()
      .setComponentName('mmc-gateway')
      .setClientId(isProduction ? crypto.randomUUID() : 'local'),
    forceStayOnSameConnection: !isProduction,
  },
});
axonConnector.connect();
const app = express();
app.use(express.json());
app.use(cors())

app.post('/', async (req, res) => {
  const command: string = req.body['command'] as string;
  const payload: never = req.body['payload'] as never;

  if (command && payload) {
    try {
      const result = await messageBus.execute(
        Object.assign(payload, { constructor: { name: command } })
      );
      res.send(result);
    } catch (e) {
      logger.error(`${e.name}: ${e.message}`);
      res.status(500).send(e.name);
    }
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
