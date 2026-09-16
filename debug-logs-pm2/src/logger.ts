import winston from 'winston';

const level = process.env.LOG_LEVEL && ['error', 'warn', 'info', 'debug'].includes(process.env.LOG_LEVEL)
  ? process.env.LOG_LEVEL
  : 'info';

const normalizeError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    value: String(error),
  };
};

export const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      const serializedMeta = Object.entries(meta)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => {
          if (key === 'err') {
            return `${key}: ${JSON.stringify(normalizeError(value))}`;
          }

          if (value instanceof Error) {
            return `${key}: ${JSON.stringify(normalizeError(value))}`;
          }

          return `${key}: ${JSON.stringify(value)}`;
        })
        .join(' ');

      if (stack) {
        return `${timestamp} ${level.toUpperCase()} ${message} ${serializedMeta ? serializedMeta : ''}\n${stack}`;
      }

      return `${timestamp} ${level.toUpperCase()} ${message}${serializedMeta ? ` ${serializedMeta}` : ''}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export const safeLogMeta = <T extends Record<string, unknown>>(meta: T) => meta;
export const serializeError = normalizeError;
