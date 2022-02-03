import { NCStorage } from "./NCStorage";

export class MemoryStorage implements NCStorage {
  private memory: { [key: string]: string } = {};

  contains(key: string): Promise<boolean> {
    return new Promise((resolve) => key in this.memory);
  }

  delete(key: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.contains(key)) return resolve(false);
      delete this.memory[key];
      return resolve(true);
    });
  }

  load(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      if (!this.contains(key)) return resolve(null);
      return resolve(this.memory[key]);
    });
  }

  save(key: string, value: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.memory[key] = value;
      return resolve(true);
    });
  }
}
