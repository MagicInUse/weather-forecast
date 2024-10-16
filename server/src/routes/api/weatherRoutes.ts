import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (_req, _res) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODONE: GET search history
router.get('/history', async (_req, res) => {
  HistoryService.getCities().then((cities) => res.json(cities));
});

// * BONUS TODONE: DELETE city from search history
router.delete('/history/:id', async (req, _res) => {
  const id = req.params.id;
  HistoryService.removeCity(id);
});

export default router;