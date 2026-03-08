/**
 * Frog Backend Entry Point
 * Runs local API server on port 4141.
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { api } from './routes/api.js';
import './db/database.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/api', api);

const port = Number(process.env.BACKEND_PORT ?? 4141);
app.listen(port, () => {
  console.log(`Frog backend listening on http://127.0.0.1:${port}`);
});
