export interface ILoggable {
  log: (...params) => void;
}
export const getLoggerObject = (): ILoggable => ({
  log: (...params) => {
    for (const param of params) {
      console.log('HANDLED', param);
    }
  }
});

export const initLogger = (logger, loggerObject?: ILoggable) => {
  if (loggerObject) {
    logger.log = loggerObject.log.bind(loggerObject);
  }
};
