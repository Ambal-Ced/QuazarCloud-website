import { createClient } from '@vercel/postgres';

const TABLE = 'download_counts';
const ALLOWED_TYPES = ['apk', 'json'];

function withCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function getClient() {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL,
  });
  await client.connect();
  return client;
}

async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ${TABLE} (
      id TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    );
  `);
}

async function fetchCounts() {
  const client = await getClient();
  try {
    await ensureTable(client);
    const { rows } = await client.query(
      `SELECT id, count FROM ${TABLE} WHERE id = 'apk' OR id = 'json'`
    );

    const counts = { apk: 0, json: 0 };
    for (const row of rows) {
      if (row.id === 'apk' || row.id === 'json') {
        counts[row.id] = Number(row.count) || 0;
      }
    }
    return counts;
  } finally {
    client.end().catch(() => {});
  }
}

async function increment(type) {
  if (!ALLOWED_TYPES.includes(type)) {
    const error = new Error('Invalid type');
    error.statusCode = 400;
    throw error;
  }

  const client = await getClient();
  try {
    await ensureTable(client);
    await client.query(
      `INSERT INTO ${TABLE} (id, count)
       VALUES ($1, 1)
       ON CONFLICT (id) DO UPDATE SET count = ${TABLE}.count + 1`,
      [type]
    );
  } finally {
    client.end().catch(() => {});
  }

  return fetchCounts();
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  withCors(res);
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const counts = await fetchCounts();
      return res.status(200).json(counts);
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const counts = await increment(body?.type);
      return res.status(200).json(counts);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('[download-counter] error', error);
    const status = error?.statusCode || 500;
    return res.status(status).json({ error: error?.message || 'Unexpected error' });
  }
}

