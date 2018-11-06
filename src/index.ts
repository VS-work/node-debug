import * as createDebug from 'debug';
import { WaffleServer } from './waffle-server';

(() => {
  createDebug.enable('*');
  // createDebug.enable('*:err');

  const waffleServer = new WaffleServer();
  const query = { select: { all: true } };

  waffleServer.processQuery(query);
})();
