export interface Polygon {
  type: 'Polygon';
  coordinates: [number, number][][];
}

export interface Feature<G = Polygon, P = Record<string, any>> {
  type: 'Feature';
  geometry: G;
  properties: P;
}

export interface FeatureCollection<G = Polygon, P = Record<string, any>> {
  type: 'FeatureCollection';
  features: Feature<G, P>[];
}
