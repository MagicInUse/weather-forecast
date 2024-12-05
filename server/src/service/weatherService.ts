import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// TODONE: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODONE: Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public date: string,
    public icon: string,
    public iconDescription: string,
    public tempF: number,
    public windSpeed: number,
    public humidity: number
  ) {}
}

// TODONE: Complete the WeatherService class
class WeatherService {
  // TODONE: Define the baseURL, API key, and city name properties
  private baseURL = process.env.API_BASE_URL || '';
  private apiKey = process.env.API_KEY || '';
  private cityName: string = '';

  // TODONE: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const response = await axios.get(`${this.baseURL}/weather?q=${query}&appid=${this.apiKey}`);
    return response.data;
  }

  // TODONE: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.coord.lat,
      lon: locationData.coord.lon,
    };
  }

  // TODONE: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=standard`;
  }

  // TODONE: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // TODONE: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await axios.get(this.buildWeatherQuery(coordinates));
    return response.data;
  }

  // TODONE: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0]; // Get the first entry for current weather
    return new Weather(
      response.city.name,
      new Date(currentWeather.dt * 1000).toLocaleDateString(),
      currentWeather.weather[0].icon,
      currentWeather.weather[0].description,
      currentWeather.main.temp,
      currentWeather.wind.speed,
      currentWeather.main.humidity
    );
  }

  // TODONE: Build parseForecast method
  private parseForecast(response: any): Weather[] {
    // Start on the 5th item and store every 7th item after that
    return response.list
      .filter((_: any, index: number) => index >= 4 && (index - 4) % 8 === 0)
      .map((entry: any) => new Weather(
        response.city.name,
        new Date(entry.dt * 1000).toLocaleDateString(),
        entry.weather[0].icon,
        entry.weather[0].description,
        entry.main.temp,
        entry.wind.speed,
        entry.main.humidity
      ));
  }

  // TODONE: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<{ current: Weather, forecast: Weather[] }> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const current = this.parseCurrentWeather(weatherData);
    const forecast = this.parseForecast(weatherData);
    return { current, forecast };
  }
}

export default new WeatherService();
