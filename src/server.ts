import config from 'config';
import app from './app.js';
import logger from './middleware/pino-logger.js';
// import { logger } from './utils/logger.js';

const port = config.get('server.port') || 3000;
const env = process.env.NODE_ENV === 'production' ? 'PRO' : 'DESA';

// logger.info('Inicio: ' + dateTimeFormat.format(new Date()));

app.listen(port, () => {
  logger.info('[FSE]: ' + config.get('server.name'));
  logger.info('[FSE]: Servidor escuchando en: ' + `http://localhost:${port}`);
  logger.info('[FSE]: ' + config.get('server.description'));
  logger.info('[FSE]: Entorno: ' + env);
});
