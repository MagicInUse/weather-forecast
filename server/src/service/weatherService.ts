import dotenv from 'dotenv';
dotenv.config();

// // TODONE: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
  // Example Response from Weather API found using Insomnia:
  // coord: { lon: -0.1257, lat: 551.508 };
  // weather: [{ icon: "", description: "clear sky" }];
  // main: { temp: 280.32, pressure: 1012, humidity: 81 };
  // wind: { speed: 4.1, deg: 80 };
  // dt: 1605182400;
  // timezone: 0;
  // id: 2643743;
  // name: "London";
class Weather implements Coordinates {
  lat: number;
  lon: number;
  icon: string;
  description: string;
  tempF: number;
  humidity: number;
  windSpeed: number;
  date: number;
  cityName: string;
  constructor(
    lat: number,
    lon: number,
    icon: string,
    description: string,
    tempF: number,
    humidity: number,
    windSpeed: number,
    date: number,
    cityName: string
  ) {
    this.lat = lat;
    this.lon = lon;
    this.icon = icon;
    this.description = description;
    this.tempF = tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.date = date;
    this.cityName = cityName;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.weatherURL as string;
  private apiKey: string = process.env.weatherAPI as string;
  private cityName: string = '';

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const url = `${this.baseURL}/data/2.5/weather?q=${query}&units=imperial&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    return response.json();
  }

  // TODO: Create destructureLocationData method
  private async destructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    const lat = locationData.coord.lat;
    const lon = locationData.coord.lon;
    const coordinates: Coordinates = { lat, lon };
    return coordinates;
  }

  // TODO: Create buildGeocodeQuery method
  // I believe this to be deprecated, as it is mentioned to use the new API
  // private buildGeocodeQuery(): string {
  //   return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}&limit=1`;
  // }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
      const locationData = await this.fetchLocationData(this.cityName);
      const coordData = await this.destructureLocationData(locationData);
      return coordData;
    }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const lat = response.coord.lat;
    const lon = response.coord.lon;
    const icon = response.weather[0].icon;
    const description = response.weather[0].description;
    const tempF = response.main.tempF;
    const humidity = response.main.humidity;
    const windSpeed = response.wind.speed;
    const date = response.dt;
    const cityName = response.name;
    return new Weather(lat, lon, icon, description, tempF, humidity, windSpeed, date, cityName);
  }

  // Example Response from Weather API found using Insomnia:
  // coord: { lon: -0.1257, lat: 551.508 };
  // weather: [{ icon: "", description: "clear sky" }];
  // main: { temp: 280.32, pressure: 1012, humidity: 81 };
  // wind: { speed: 4.1, deg: 80 };
  // dt: 1605182400;
  // timezone: 0;
  // id: 2643743;
  // name: "London";

  // TODO: Complete buildForecastArray method
  private buildForecastArray(response: any): Weather[] {
    const weatherData = response;
    const forecastArray: Weather[] = [];
    for (let i = 0; i < weatherData.daily.length; i++) {
      const lat = weatherData.lat;
      const lon = weatherData.lon;
      const icon = weatherData.daily[i].weather[0].icon;
      const description = weatherData.daily[i].weather[0].description;
      const tempF = weatherData.daily[i].tempF.day;
      const humidity = weatherData.daily[i].humidity;
      const windSpeed = weatherData.daily[i].wind_speed;
      const date = weatherData.daily[i].dt;
      const cityName = weatherData.daily[i].name;
      forecastArray.push(new Weather(lat, lon, icon, description, tempF, humidity, windSpeed, date, cityName));
    }
    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const weatherData = await this.fetchAndDestructureLocationData();
    const response = await this.fetchWeatherData(weatherData);
    const currentWeather = this.parseCurrentWeather(response);
    const forecast = this.buildForecastArray(response);
    return [currentWeather, ...forecast];
  }
}

export default new WeatherService();