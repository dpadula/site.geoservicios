import app from './app.js';
import { env } from './config/env';
import { logger } from './utils/logger';

const port = env.PORT || 3000;

app.listen(port, () => {
  logger.info(`✅ Servidor GeoJSON escuchando en http://localhost:${port}`);
});
