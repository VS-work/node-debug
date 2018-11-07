import { createLogger } from 'bunyan';
import { Writable } from 'stream';
import { DdfCsvReader } from './ddfcsv-reader';
import { ConsoleStream } from './logger-utils';

function isObject(x) {
  return typeof (x) === 'object' && x !== null;
}

export class WaffleServer {
  private logger;

  constructor(private logStream?: Writable) {
    this.logger = createLogger({
      name: 'waffleserver',
      streams: [{
        level: 'info',
        type: 'raw',
        src: true,
        stream: this.logStream || new ConsoleStream()
      }]
    });
  }

  processQuery(query) {
    const ddfCsvReader = new DdfCsvReader(this.logStream);
    const data = ddfCsvReader.read(query);

    this.logger.info('got data');
    this.logger.info(data);
    this.logger.info('in accordance with');
    this.logger.info(query);

    return data;
  }
}
