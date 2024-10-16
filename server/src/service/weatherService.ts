import dotenv from 'dotenv';
dotenv.config();

// TODONE: Define an interface for the Coordinates object
// interface Coordinates {
//   lat: number;
//   lon: number;
// }

// TODO: Define a class for the Weather object
// class Weather implements Coordinates {
//   lat: number;
//   lon: number;
//   cityName: string;
//   description: string;
//   temperature: number;
//   feelsLike: number;
//   humidity: number;
//   windSpeed: number;
//   icon: string;
//   forecast: Weather[];
//   constructor(
//     lat: number,
//     lon: number,
//     city: string,
//     description: string,
//     temperature: number,
//     feelsLike: number,
//     humidity: number,
//     windSpeed: number,
//     icon: string,
//     forecast: Weather[]
//   ) {
//     this.lat = lat;
//     this.lon = lon;
//     this.cityName = city;
//     this.description = description;
//     this.temperature = temperature;
//     this.feelsLike = feelsLike;
//     this.humidity = humidity;
//     this.windSpeed = windSpeed;
//     this.icon = icon;
//     this.forecast = forecast;
//   }
// }

export default new WeatherService();