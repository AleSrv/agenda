import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.RENDER_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function query(text: string, params?: (string | number | boolean | null)[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}