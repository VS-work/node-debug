import * as createDebug from 'debug';
import { DdfCsvReader } from './ddfcsv-reader';
import { initLogger, ILoggable } from './logger-wrapper';

export class WaffleServer {
  private logger;

  constructor(private loggerObject?: ILoggable) {
    this.logger = createDebug('waffleserver:log');
    initLogger(this.logger, loggerObject);
  }

  processQuery(query) {
    const ddfCsvReader = new DdfCsvReader(this.loggerObject);
    const data = ddfCsvReader.read(query);

    this.logger('got data ', data, ' in accordance with ', data, query);

    return data;
  }
}
