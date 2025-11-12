// src/db/oracleManager.ts
import config from 'config';
import oracledb, { Connection, ExecuteOptions, PoolAttributes } from 'oracledb';
import logger from './pino-logger.js';

// ==========================
// 🔹 Tipos de configuración
// ==========================
interface OracleConfig extends PoolAttributes {
  poolAlias: string;
}

//configuracion para que no devuelva objetos CLOB y si en formato JSON
oracledb.fetchAsString = [oracledb.CLOB];
// ==========================
// 🔹 Obtener conexión
// ==========================
export async function getConnection(): Promise<Connection> {
  const oracleConfig = config.get<OracleConfig>('oracle');

  try {
    const pool = oracledb.getPool(oracleConfig.poolAlias);
    return await pool.getConnection();
  } catch {
    // Si el pool no existe, lo creamos
    await oracledb.createPool(oracleConfig);
    const pool = oracledb.getPool(oracleConfig.poolAlias);
    return await pool.getConnection();
  }
}

// ==========================
// 🔹 Cerrar pool
// ==========================
export async function close(): Promise<void> {
  try {
    const pool = oracledb.getPool();
    await pool.close(10); // espera hasta 10 segundos para cerrar conexiones activas
  } catch (err) {
    logger.error({ err: err as Error }, '⚠️  No se pudo cerrar el pool:');
  }
}

// ==========================
// 🔹 Constantes de formato
// ==========================
export const json: ExecuteOptions = { outFormat: oracledb.OUT_FORMAT_OBJECT };

export const insert: ExecuteOptions = { autoCommit: true };

export const modif: ExecuteOptions = {
  autoCommit: true,
  outFormat: oracledb.OUT_FORMAT_OBJECT,
};
