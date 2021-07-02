import AsyncStorage from '@react-native-async-storage/async-storage';
import {InventoryItem} from './types';

export default class Db {
  private key = 'bluemoon_db';

  private async store(v: InventoryItem[]): Promise<boolean> {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(v));
      return true;
    } catch (e) {
      console.log('Failed to get data from async storage');
    }
    return false;
  }

  public async fetchData(): Promise<InventoryItem[]> {
    try {
      const data = await AsyncStorage.getItem(this.key);
      if (data) {
        // store by most recent timestamp
        return (JSON.parse(data) as InventoryItem[]).sort(
          (a, b) => b.timestamp - a.timestamp,
        );
      }
    } catch (e) {
      console.log('Failed to get data from async storage');
    }
    return [] as InventoryItem[];
  }

  public async getInvertoryNames() {
    return (await this.fetchData()).map(item => item.name);
  }

  public async add(v: InventoryItem): Promise<boolean> {
    const data = await this.fetchData();
    return await this.store([
      ...data,
      {...v, id: data.length + 1, timestamp: Date.now()},
    ]);
  }

  public async remove(v: InventoryItem): Promise<boolean> {
    const data = await this.fetchData();
    const result = data.findIndex(i => i.name === v.name);
    if (result >= 0) {
      data.splice(result, 1);
    }
    return await this.store(data);
  }

  public async update(v: InventoryItem): Promise<boolean> {
    const data = await this.fetchData();
    const result = data.findIndex(i => i.id === v.id);
    if (result >= 0) {
      data.splice(result, 1, {...v, timestamp: Date.now()});
    }
    return await this.store(data);
  }
}
