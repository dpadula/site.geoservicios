import { Request, Response } from 'express';
import logger from '../middleware/pino-logger.js';
import { getCortesService } from '../services/site.cortes.service.js';

export const getCortes = async (req: Request, res: Response) => {
  try {
    const geojson = await getCortesService();
    res.json(geojson);
  } catch (err) {
    logger.error({ err: err as Error }, 'Error al generar GeoJSON');
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
