import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODONE: Define route to serve index.html
router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Base URL path
// const BASE_URL = '';
const BASE_URL = '/weather';

const app = express();

// Serve static files of entire client dist folder
app.use(BASE_URL, express.static(path.join(__dirname, '../../client/dist')));

app.get(`${BASE_URL}/*`, (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default router;
