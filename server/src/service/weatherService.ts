import dotenv from 'dotenv';
dotenv.config();

// TODONE: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherData {
  name: string;
  current: {
    dt: number;
    weather: { description: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
  };
  daily: {
    dt: number;
    weather: { description: string }[];
    temp: { max: number };
    humidity: number;
    wind_speed: number;
  }[];
}

// TODONE: Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public date: string,
    public description: string,
    public temp: number,
    public humidity: number,
    public windSpeed: number
  ) {}
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
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<WeatherData> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: WeatherData): Weather {
    const { name } = response;
    const { dt, weather, main, wind } = response.current;
    const date = new Date(dt * 1000).toLocaleDateString();
    const description = weather[0].description;
    const temp = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    return new Weather(name, date, description, temp, humidity, windSpeed);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: WeatherData): Weather[] {
    const forecastArray = weatherData.daily.map((day) => {
      const { dt, weather, temp, humidity, wind_speed } = day;
      const date = new Date(dt * 1000).toLocaleDateString();
      const description = weather[0].description;
      const tempMax = temp.max;
      return new Weather(currentWeather.city, date, description, tempMax, humidity, wind_speed);
    });
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData);
    return { currentWeather, forecastArray };
  }
}

export default new WeatherService();