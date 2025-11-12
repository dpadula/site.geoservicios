import { Router } from 'express';
import {
  getMultiplePolygonsGeoJSON,
  getPolygonGeoJSON,
} from '../controllers/polygon.controller.js';
import { getCortes } from '../controllers/site.cortes.controller.js';

const router = Router();

// GET /api/polygons
router.get('/', getPolygonGeoJSON);
router.get('/santafe', getMultiplePolygonsGeoJSON);
router.get('/cortes', getCortes);

export default router;
