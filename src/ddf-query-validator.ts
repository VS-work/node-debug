import { createLogger } from 'bunyan';
import { Writable } from 'stream';
import { ConsoleStream } from './logger-utils';

export class DdfQueryValidator {
  private logger;

  constructor(private logStream?: Writable) {
    this.logger = createLogger({
      name: 'ddfcsvreader',
      streams: [{
        level: 'info',
        type: 'raw',
        src: true,
        stream: this.logStream || new ConsoleStream()
      }]
    });
  }

  validate(query) {
    this.logger.info('trying to validate ', query);

    return true;
  }
}
