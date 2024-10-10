import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// TODONE: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODONE: Complete the HistoryService class
class HistoryService {
  // TODONE: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile('searchHistory.json', 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  // TODONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile('searchHistory.json', JSON.stringify(cities));
    } catch (err) {
      console.error(err);
    }
  }
  // TODONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities;
  }
  // TODONE: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.read();
    const newCity = new City(city, uuidv4());
    cities.push(newCity);
    await this.write(cities);
  }
  
  // * BONUS TODONE: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.read();
    const newCities = cities.filter(city => city.id !== id);
    await this.write(newCities);
  }
}

export default new HistoryService();