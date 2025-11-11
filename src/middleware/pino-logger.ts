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
  emerg: (msg: string, ...args: unknown[]) => void;
  alert: (msg: string, ...args: unknown[]) => void;
  crit: (msg: string, ...args: unknown[]) => void;
  warning: (msg: string, ...args: unknown[]) => void;
  notice: (msg: string, ...args: unknown[]) => void;
  error: (msg: string, ...args: unknown[]) => void;
  info: (msg: string, ...args: unknown[]) => void;
  debug: (msg: string, ...args: unknown[]) => void;
};

// ==========================
// 🔹 Configuración base
// ==========================
const timestampFormat: string = config.has('logDatetimeFormat')
  ? config.get<string>('logDatetimeFormat')
  : 'DD-MM-YYYY HH:mm:ss';
console.log('🚀 ~ timestampFormat:', timestampFormat);

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
        messageFormat: '[{levelLabel}] {msg}',
        ignore: 'pid,hostname',
      },
    },
  },
  PRO: {
    level: 'notice',
    // En producción escribimos logs simples en archivo plano (sin rotación)
    transport: {
      target: 'pino/file',
      options: {
        destination: './log/app.log',
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
  console.log('🚀 ~ createAppLogger ~ env:', env);

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
// 🔹 Export singleton por defecto
// ==========================
const logger = createAppLogger();
export default logger;
