import { Feature, FeatureCollection, Polygon } from '../types/geojson';

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

const polygonCentroSantaFe: [number, number][] = [
  [-60.703792, -31.641099],
  [-60.700995, -31.641044],
  [-60.700943, -31.643189],
  [-60.70372, -31.643242],
  [-60.703792, -31.641099],
];

const polygonParqueSur: [number, number][] = [
  [-60.70935, -31.63918],
  [-60.70549, -31.6418],
  [-60.70423, -31.6439],
  [-60.70777, -31.6462],
  [-60.71052, -31.6439],
  [-60.70935, -31.63918],
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

/**
 * Devuelve varios polígonos reales como FeatureCollection
 */
export function buildMultiplePolygonsGeoJSON(): FeatureCollection<Polygon> {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygonCentroSantaFe],
        },
        properties: {
          name: 'Centro de Santa Fe',
          categoria: 'urbano',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygonParqueSur],
        },
        properties: {
          name: 'Parque del Sur',
          categoria: 'recreativo',
        },
      },
    ],
  };
}
