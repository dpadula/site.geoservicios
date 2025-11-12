import config from 'config';
import pino, { Logger, LoggerOptions } from 'pino';

// ==========================
// 🔹 Configuración base
// ==========================
const timestampFormat: string = config.has('logDatetimeFormat')
  ? config.get<string>('logDatetimeFormat')
  : 'dd/MM/yyyy HH:mm:ss'; // formato correcto para pino-pretty

// fatal	60	errores críticos
// error	50	fallos normales
// warn	40	advertencias
// info	30	información general
// debug	20	mensajes de depuración
// trace	10	mensajes muy detallados
// silent	-∞	desactivar logging

interface EnvConfig {
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
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
    level: 'info',
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
export function createAppLogger(): Logger {
  const env = process.env.NODE_ENV === 'production' ? 'PRO' : 'DESA';

  const logger = pino({
    level: options[env].level,
    transport: options[env].transport,
    base: null,
    timestamp: pino.stdTimeFunctions.isoTime, // estándar ISO
  } as LoggerOptions);

  return logger;
}

// ==========================
// 🔹 Export singleton por defecto
// ==========================
const logger = createAppLogger();
export default logger;
