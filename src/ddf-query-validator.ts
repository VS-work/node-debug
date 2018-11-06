import * as createDebug from 'debug';
import { initLogger, ILoggable } from './logger-wrapper';

export class DdfQueryValidator {
  private logger;

  constructor(loggerObject?: ILoggable) {
    this.logger = createDebug('ddfcsvreader:log');
    initLogger(this.logger, loggerObject);
  }

  validate(query) {
    this.logger('trying to validate ', query);

    return true;
  }
}
