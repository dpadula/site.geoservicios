import * as ora from '../middleware/oraConnManager.js';
import logger from '../middleware/pino-logger.js';
import { FeatureCollection, Polygon } from '../types/geojson.js';

const queryPoligonosCortes = `SELECT JSON_OBJECT (
           'type' VALUE 'FeatureCollection',
           'features' VALUE
               JSON_ARRAYAGG (
                   json_object (
                       'type' VALUE 'Feature',
                       'geometry' VALUE geojson FORMAT JSON,
                       'properties' VALUE
                           json_object (
                               'id' VALUE id,
                               'name' VALUE name,
                               'tipo_documento' VALUE tipo_documento,
                               'creation_time' VALUE creation_time)
                       RETURNING CLOB)
                   RETURNING CLOB)
           RETURNING CLOB) Cortes
  FROM epe_temp_documentos_abiertos_geom
 WHERE geojson IS NOT NULL`;

const executeQuery = async (
  query: string,
  record: any[] = []
): Promise<{ rows: Array<Record<string, any>> }> => {
  let conn: any;
  try {
    conn = await ora.getConnection();
    const result = await conn.execute(query, record, ora.json);
    conn.close();
    return result as { rows: Array<Record<string, any>> };
  } catch (error) {
    logger.error(JSON.stringify(record));
    if (conn) conn.close();
    throw error;
  }
};

export const getCortesService = async (): Promise<
  FeatureCollection<Polygon>
> => {
  try {
    const result = await executeQuery(queryPoligonosCortes, []);

    const geojsonText = result.rows?.[0]?.CORTES as string | undefined;

    if (!geojsonText) {
      logger.warn('Consulta de cortes no devolvió resultados');
      return {
        type: 'FeatureCollection',
        features: [],
      };
    }

    // 👇 Parseamos el JSON devuelto por Oracle
    const geojson = JSON.parse(geojsonText) as FeatureCollection<Polygon>;

    logger.info(
      `[GeoJSON] FeatureCollection con ${geojson.features.length} features`
    );

    return geojson;
  } catch (error) {
    logger.error({ err: error as Error }, 'Error en getCortesService');
    throw error;
  }
};
