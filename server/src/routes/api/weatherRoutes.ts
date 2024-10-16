import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODONE: GET search history
router.get('/history', async (req, res) => {
  HistoryService.getCities();
});

// * BONUS TODONE: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const id = req.params.id;
  HistoryService.removeCity(id);
});

export default router;