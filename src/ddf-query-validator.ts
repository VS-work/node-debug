import * as createDebug from 'debug';
import { initLogger, ILoggable } from './custom-logger';

export class DdfQueryValidator {
  private logger;

  constructor(loggerObject?: ILoggable) {
    this.logger = createDebug('ddfcsvreader:log');
    initLogger(this.logger, loggerObject);
  }

  validate(query) {
    this.logger('trying to validate %j', query);

    return true;
  }
}
