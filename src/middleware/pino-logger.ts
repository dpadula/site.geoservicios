import config from 'config';
import pino, { Logger, LoggerOptions } from 'pino';

// ==========================
// 🔹 Definición de niveles
// ==========================
const customLevels = {
  emerg: 70,
  alert: 60,
  crit: 50,
  error: 40,
  warning: 30,
  notice: 25,
  info: 20,
  debug: 10,
} as const;

type CustomLevel = keyof typeof customLevels;

type CustomLogger = Logger & {
  [K in CustomLevel]: (msg: string, ...args: unknown[]) => void;
};

// ==========================
// 🔹 Configuración base
// ==========================
const timestampFormat: string = config.has('logDatetimeFormat')
  ? config.get<string>('logDatetimeFormat')
  : 'dd/MM/yyyy HH:mm:ss'; // formato correcto para pino-pretty

interface EnvConfig {
  level: CustomLevel;
  transport?: LoggerOptions['transport'];
}

const options: Record<'DESA' | 'PRO', EnvConfig> = {
  DESA: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: `SYS:${timestampFormat}`,
        messageFormat: '[{level}] {msg}', // usamos {level} en lugar de {levelLabel}
        ignore: 'pid,hostname',
      },
    },
  },
  PRO: {
    level: 'notice',
    transport: {
      target: 'pino/file',
      options: {
        destination: './log/geoservicios.log',
        mkdir: true,
      },
    },
  },
};
// ==========================
// 🔹 Creación del logger
// ==========================
export function createAppLogger(): CustomLogger {
  const env = process.env.NODE_ENV === 'production' ? 'PRO' : 'DESA';

  const pinoLogger = pino({
    customLevels,
    useOnlyCustomLevels: true,
    level: options[env].level,
    transport: options[env].transport,
    base: null,
    timestamp: pino.stdTimeFunctions.isoTime,
  } as LoggerOptions) as CustomLogger;

  return pinoLogger;
}

// ==========================
// 🔹 Export singleton
// ==========================
const logger = createAppLogger();
export default logger;
