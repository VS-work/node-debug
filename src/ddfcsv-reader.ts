import { DdfQueryValidator } from './ddf-query-validator';
import { createLogger, ILoggable } from './logger-utils';

export class DdfCsvReader {
  private logger;
  private error;

  constructor(private loggerObject?: ILoggable) {
    this.logger = createLogger('ddfcsvreader:log', loggerObject);
    this.error = createLogger('ddfcsvreader:err', loggerObject);
  }

  read(query) {
    this.logger('reading ', query);
    this.error('just an error');

    const validator = new DdfQueryValidator(this.loggerObject);

    validator.validate(query);

    return { data: [1, 2, 3], for: query };
  }
}
