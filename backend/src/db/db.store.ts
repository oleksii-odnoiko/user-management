import * as fs from 'node:fs';
import path from 'path';
import { logger } from '../utils';

export class DbStore<Type> {
  readonly fileName = 'db.json';
  private store: any;

  constructor(
    private key: string,
    private primaryKey = 'id'
  ) {}

  private generateId() {
    const data = this.getItems();
    return data.reduce((acc, item: any) => {
      if (item[this.primaryKey] >= acc) return item[this.primaryKey] + 1;
      return acc;
    }, 1);
  }

  private readStore(): void {
    logger.info('Reading data from store...');
    this.store = JSON.parse(fs.readFileSync(path.join(__dirname, this.fileName), 'utf8'));
  }

  private writeStore() {
    logger.info('Writing data to store...');
    fs.writeFileSync(path.join(__dirname, this.fileName), JSON.stringify(this.store));
  }

  getItems(): Type[] {
    this.readStore();
    return this.store[this.key];
  }

  addItem(item: Type) {
    const id = this.generateId();
    const newItem = {
      [this.primaryKey]: id,
      ...item
    };
    this.store[this.key].push(newItem);
    this.writeStore();
    return newItem;
  }

  deleteItem(id: number) {
    const data = this.getItems();
    this.store[this.key] = data.filter((item: any) => item[this.primaryKey] !== id);
    this.writeStore();
  }

  updateItem(id: number, updatedItem: any) {
    const data = this.getItems();
    const index = data.findIndex((item: any) => item[this.primaryKey] === id);
    data[index] = { ...data[index], ...updatedItem };
    this.writeStore();
  }

  getItem(id: number) {
    const data = this.getItems();
    return data.find((item: any) => item[this.primaryKey] === id);
  }
}
