import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  const cityName = req.body.city;
  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }
  try {
    // TODONE: GET weather data from city name
    const weatherData =  WeatherService.getWeatherForCity(cityName);
    // TODONE: save city to search history
    HistoryService.addCity(cityName);
    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  const cities = await HistoryService.getCities();
  res.json(cities);
  return res.status(200).json(cities);
});

// * BONUS TODONE: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  await HistoryService.removeCity(id);
  res.json({ message: 'City removed from search history' });
  return res.status(200).json({ message: 'City removed from search history' });
});

export default router;