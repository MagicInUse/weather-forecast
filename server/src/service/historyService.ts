import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';

// TODONE: Define a City class with name and id properties
class City {
  id: string;
  cityName: string;
  constructor(cityName: string) {
    this.id = uuidv4();
    this.cityName = cityName;
  }
}

// TODONE: Complete the HistoryService class
class HistoryService {
  // TODONE: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('db/searchHistory.json', {
      encoding: 'utf-8',
    });
  }
  // TODONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await fs.writeFile('db/searchHistory.json', JSON.stringify(cities));
  }
  // TODONE: Define a getCities method that reads the cities from the searchHistory.json file
  // and returns them as an array of City objects
  async getCities() {
    return await this.read()
      .then((cities) => {
      let parsedCities: City[];

      // If cities isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }
  // TODONE: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    // Add a unique id to the city using uuid package
    const newCity: City = {
      id: uuidv4(),
      cityName: city,
    };

    // Get all cities, add the new city, write all the updated cities, return the newCity
    return await this.getCities()
      .then((cities) => {
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }
  // * BONUS TODONE: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
      .then((cities) => {
        // Filter out the city with the matching id
        return cities.filter((city) => city.id !== id);
      })
      // Write the updated cities back to the file
      .then((updatedCities) => this.write(updatedCities));
  }
}

export default new HistoryService();