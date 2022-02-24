const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://ijwxjlsqslohdc:a7028dd3e3c8da287726146feb77a5bc45015c5b8648775c93c36a5c2334b458@ec2-3-231-69-204.compute-1.amazonaws.com:5432/d73pu1kv2hdak4',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const readSession = async () => {
  try {
    const res = await client.query('SELECT * FROM wa_sessions ORDER BY created_at DESC LIMIT 1');
    if (res.rows.length) return res.rows[0].session;
    return '';
  } catch (err) {
    throw err;
  }
}

const saveSession = (session) => {
  client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, results) => {
    if (err) {
      console.error('Failed to save session!', err);
    } else {
      console.log('Session saved!');
    }
  });
}

const removeSession = () => {
  client.query('DELETE FROM wa_sessions', (err, results) => {
    if (err) {
      console.error('Failed to remove session!', err);
    } else {
      console.log('Session deleted!');
    }
  });
}

module.exports = {
  readSession,
  saveSession,
  removeSession
}