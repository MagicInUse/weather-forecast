import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODONE: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      return res.status(400).send('City name is required');
    }

    // TODONE: GET weather data from city name
    const weather = await WeatherService.getWeatherForCity(cityName);

    // TODONE: save city to search history
    await HistoryService.addCity(cityName);

    return res.json(weather);
  } catch (error) {
    return res.status(500).send('Error retrieving weather data');
  }
});

// TODONE: GET search history
router.get('/history', async (_req, res) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).send('Error retrieving search history');
  }
});

// * BONUS TODONE: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.send('City removed from search history');
  } catch (error) {
    res.status(500).send('Error removing city from search history');
  }
});

export default router;