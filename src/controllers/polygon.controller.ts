import { Request, Response } from 'express';
import { buildPolygonGeoJSON } from '../services/polygon.service';
import { logger } from '../utils/logger.js';

export const getPolygonGeoJSON = (req: Request, res: Response) => {
  try {
    const geojson = buildPolygonGeoJSON();
    res.json(geojson);
  } catch (err) {
    logger.error('Error al generar GeoJSON', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
