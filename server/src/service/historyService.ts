import fs from 'fs/promises';
import path from 'path';

// TODONE: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

// TODONE: Complete the HistoryService class
class HistoryService {
  private filePath = path.resolve('searchHistory.json');

  // TODONE: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // TODONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  // TODONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODONE Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    let cities = await this.read();
    const existingCityIndex = cities.findIndex(city => city.name.toLowerCase() === name.toLowerCase());

    if (existingCityIndex !== -1) {
      // Move the existing city to the top
      const [existingCity] = cities.splice(existingCityIndex, 1);
      cities.unshift(existingCity);
    } else {
      // Add new city to the top
      const id = (cities.length + 1).toString();
      cities.unshift(new City(id, name));
    }

    await this.write(cities);
  }

  // * BONUS TODONE: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
