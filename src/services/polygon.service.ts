import { Feature, FeatureCollection, Polygon } from '../types/geojson.js';

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
          coordinates: [
            [
              [-60.7091, -31.6488],
              [-60.7071, -31.6503],
              [-60.7048, -31.6487],
              [-60.7068, -31.6472],
              [-60.7091, -31.6488],
            ],
          ],
        },
        properties: {
          name: 'Corte Programado',
          tension: 'MT',
          tipo: 'Programado',
          fechaCreacion: '2025-10-31',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-60.7184, -31.6395],
              [-60.7159, -31.641],
              [-60.7136, -31.6391],
              [-60.7158, -31.6377],
              [-60.7184, -31.6395],
            ],
          ],
        },
        properties: {
          name: 'Corte Forzado',
          tension: 'BT',
          tipo: 'Forzado',
          fechaCreacion: '2025-10-31',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-60.6962, -31.6423],
              [-60.6937, -31.644],
              [-60.6915, -31.6422],
              [-60.694, -31.6407],
              [-60.6962, -31.6423],
            ],
          ],
        },
        properties: {
          name: 'Corte Programado',
          tension: 'MT',
          tipo: 'Programado',
          fechaCreacion: '2025-10-31',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-60.7321, -31.6509],
              [-60.7298, -31.6523],
              [-60.7272, -31.6502],
              [-60.7295, -31.6487],
              [-60.7321, -31.6509],
            ],
          ],
        },
        properties: {
          name: 'Corte Forzado',
          tension: 'BT',
          tipo: 'Forzado',
          fechaCreacion: '2025-10-31',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-60.7135, -31.633],
              [-60.7112, -31.6346],
              [-60.709, -31.6325],
              [-60.7113, -31.6311],
              [-60.7135, -31.633],
            ],
          ],
        },
        properties: {
          name: 'Corte Forzado',
          tension: 'MT',
          tipo: 'Forzado',
          fechaCreacion: '2025-10-31',
        },
      },
    ],
  };
}
