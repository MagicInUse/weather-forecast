import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODONE: Serve static files of entire client dist folder
app.use(express.static('client/dist'));

// TODONE: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
// used to better parse data sent via forms
app.use(express.urlencoded({ extended: true }));

// TODONE: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));