import * as createDebug from 'debug';
import { Writable } from 'stream';

export interface ILoggable {
  log: (...params) => void;
}

export const getResponseLoggerWrapper = (response): ILoggable => ({
  log: (...params) => {
    for (const param of params) {
      if (param === undefined) {
        response.write('undefined');
      } else if (param === null) {
        response.write('null');
      } else if (typeof param === 'object') {
        response.write(JSON.stringify(param, null, 2));
      } else {
        response.write(param.toString());
      }

      response.write('\n');
    }
  }
});

export const createLogger = (namespace: string, loggerWrapper?: ILoggable) => {
  const logger = createDebug(namespace);

  if (loggerWrapper) {
    logger.log = loggerWrapper.log.bind(loggerWrapper);
  }

  return logger;
};

export function ConsoleStream() {
}

ConsoleStream.prototype.write = function (rec) {
  console.log(rec);
}

export function ResponseStream(response) {
  this.response = response;
}

ResponseStream.prototype.write = function (rec) {
  this.response.write(JSON.stringify(rec, null, 2));
}

/*export class XStream extends Writable {
  _write(chunk, encoding, cb) {
    console.log('!!!!!');
  }
}
*/

