import { DdfCsvReader } from './ddfcsv-reader';
import { createLogger, ILoggable } from './logger-utils';

export class WaffleServer {
  private logger;

  constructor(private loggerObject?: ILoggable) {
    this.logger = createLogger('waffleserver:log', loggerObject);
  }

  processQuery(query) {
    const ddfCsvReader = new DdfCsvReader(this.loggerObject);
    const data = ddfCsvReader.read(query);

    this.logger('got data ', data, ' in accordance with ', query);

    return data;
  }
}
