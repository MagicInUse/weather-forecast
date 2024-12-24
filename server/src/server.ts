import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// // Base URL path
const BASE_URL = '';
// // const BASE_URL = '/weather';

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());

// Implement middleware to connect the routes
app.use(BASE_URL, routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));