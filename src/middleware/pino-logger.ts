import config from 'config';
import pino, { Logger, LoggerOptions } from 'pino';

const timestampFormat: string = config.has('logDatetimeFormat')
  ? config.get<string>('logDatetimeFormat')
  : 'dd/MM/yyyy HH:mm:ss';

interface EnvConfig {
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  transport?: LoggerOptions['transport'];
}

const options: Record<'DESA' | 'PRO', EnvConfig> = {
  DESA: {
    level: 'debug',
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: `SYS:${timestampFormat}`,
            messageFormat: '[{level}] {msg}',
            ignore: 'pid,hostname',
          },
        },
        {
          target: 'pino-pretty',
          options: {
            colorize: false,
            translateTime: `SYS:${timestampFormat}`,
            messageFormat: '[{level}] {msg}',
            ignore: 'pid,hostname',
            destination: './log/geoservicios.log',
            mkdir: true,
          },
        },
      ],
    },
  },
  PRO: {
    level: 'info',
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: false,
            translateTime: `SYS:${timestampFormat}`,
            messageFormat: '[{level}] {msg}',
            ignore: 'pid,hostname',
            destination: './log/geoservicios.log',
            mkdir: true,
          },
        },
      ],
    },
  },
};

export function createAppLogger(): Logger {
  const env = process.env.NODE_ENV === 'production' ? 'PRO' : 'DESA';

  const logger = pino({
    level: options[env].level,
    transport: options[env].transport,
    base: null,
  } as LoggerOptions);

  return logger;
}

const logger = createAppLogger();
export default logger;
