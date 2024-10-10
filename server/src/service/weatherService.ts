import dotenv from 'dotenv';
dotenv.config();

// TODONE: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODONE: Define a class for the Weather object
class Weather implements Coordinates{
  name: string;
  lat: number;
  lon: number;
  current: {
    date: number;
    weather: { description: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
  };
  daily: {
    date: number;
    weather: { description: string }[];
    temp: { max: number };
    humidity: number;
    wind_speed: number;
  }[];
  constructor(name: string, lat: number, lon: number) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.current = { date: 0, weather: [{ description: '' }], main: { temp: 0, humidity: 0 }, wind: { speed: 0 } };
    this.daily = [{ date: 0, weather: [{ description: '' }], temp: { max: 0 }, humidity: 0, wind_speed: 0 }];
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = 'https://api.openweathermap.org/data/2.5/';
  private apiKey = process.env.weatherAPI;
  private city = '';
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(query);
    return await response.json();
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}weather?q=${this.city}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    console.log('we got here!');
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: Weather): Weather {
    const { name, lat, lon } = response;
    return new Weather(name, lat, lon);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: Weather): Weather[] {
    const forecastArray = weatherData.daily.map((daily) => {
      const { name } = weatherData;
      return new Weather(name, weatherData.lat, weatherData.lon);
      daily = {
        date: daily.date,
        weather: daily.weather,
        temp: daily.temp,
        humidity: daily.humidity,
        wind_speed: daily.wind_speed,
      };
    });
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData);
    return { currentWeather, forecastArray };
  }
}

export default new WeatherService();