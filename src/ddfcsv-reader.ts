import { createLogger } from 'bunyan';
import { DdfQueryValidator } from './ddf-query-validator';
import { Writable } from 'stream';
import { ConsoleStream } from './logger-utils';

export class DdfCsvReader {
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

  read(query) {
    this.logger.info('reading');
    this.logger.info({msg: 'reading!', query});
    this.logger.error('just an error');

    const validator = new DdfQueryValidator(this.logStream);

    validator.validate(query);

    return { data: [1, 2, 3], for: query };
  }
}
