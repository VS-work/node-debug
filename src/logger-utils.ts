import * as createDebug from 'debug';

export interface ILoggable {
  log: (...params) => void;
}
export const getResponseLoggerWrapper = (response): ILoggable => ({
  log: (...params) => {
    for (const param of params) {
      if (typeof param === 'object') {
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
