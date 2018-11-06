import * as express from 'express';
import * as createDebug from 'debug';
import { WaffleServer } from './waffle-server';
import { getResponseLoggerWrapper } from './logger-utils';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  createDebug.enable('*');

  const loggerWrapper = getResponseLoggerWrapper(res);
  const waffleServer = new WaffleServer(loggerWrapper);
  const query = { select: { all: true } };

  const result = JSON.stringify(waffleServer.processQuery(query), null, 2);

  res.write(`----------------------\nresult is ${result}`);
  res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
