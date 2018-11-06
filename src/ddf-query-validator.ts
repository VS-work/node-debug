import { createLogger, ILoggable } from './logger-utils';

export class DdfQueryValidator {
  private logger;

  constructor(loggerObject?: ILoggable) {
    this.logger = createLogger('ddfcsvreader:log', loggerObject);
  }

  validate(query) {
    this.logger('trying to validate ', query);

    return true;
  }
}
