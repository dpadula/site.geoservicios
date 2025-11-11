import { Router } from 'express';
import {
  getMultiplePolygonsGeoJSON,
  getPolygonGeoJSON,
} from '../controllers/polygon.controller.js';

const router = Router();

// GET /api/polygons
router.get('/', getPolygonGeoJSON);
router.get('/santafe', getMultiplePolygonsGeoJSON);

export default router;
