import * as createDebug from 'debug';
import { DdfQueryValidator } from './ddf-query-validator';
import { initLogger, ILoggable } from './logger-wrapper';

export class DdfCsvReader {
  private logger;
  private error;

  constructor(private loggerObject?: ILoggable) {
    this.logger = createDebug('ddfcsvreader:log');
    initLogger(this.logger, loggerObject);
    this.error = createDebug('ddfcsvreader:err');
    initLogger(this.error, loggerObject);
  }

  read(query) {
    this.logger('reading ', query);
    this.error('just an error');

    const validator = new DdfQueryValidator(this.loggerObject);

    validator.validate(query);

    return { data: [1, 2, 3], for: query };
  }
}
