import { promises as fs } from 'fs';
import { randomUUID } from 'node:crypto';
import { GuestMutation, IGuest } from './types';

const fileName = './db.json';
let data: IGuest[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      console.error(e);
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: GuestMutation) {
    const guest: IGuest = {
      ...item,
      id: randomUUID(),
    };

    data.push(guest);
    await this.save();
    return guest;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default fileDb;