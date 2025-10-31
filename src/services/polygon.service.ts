import { Feature, Polygon } from '../types/geojson';

/**
 * Simula coordenadas obtenidas desde una base de datos o API externa.
 */
const coordinates: [number, number][] = [
  [-60.711, -31.652],
  [-60.701, -31.655],
  [-60.698, -31.649],
  [-60.707, -31.646],
  [-60.711, -31.652],
];

/**
 * Construye un objeto GeoJSON de tipo Polygon.
 */
export function buildPolygonGeoJSON(): Feature<Polygon> {
  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates],
    },
    properties: {
      name: 'Zona de prueba',
      fuente: 'Base de datos X',
    },
  };
}
