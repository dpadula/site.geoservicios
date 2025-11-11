import { Request, Response } from 'express';
import logger from '../middleware/pino-logger.js';
import {
  buildMultiplePolygonsGeoJSON,
  buildPolygonGeoJSON,
} from '../services/polygon.service.js';

export const getPolygonGeoJSON = (req: Request, res: Response) => {
  try {
    const geojson = buildPolygonGeoJSON();
    res.json(geojson);
  } catch (err) {
    logger.error('Error al generar GeoJSON', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getMultiplePolygonsGeoJSON = (req: Request, res: Response) => {
  try {
    const geojson = buildMultiplePolygonsGeoJSON();
    res.json(geojson);
  } catch (err) {
    logger.error('Error al generar FeatureCollection', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
