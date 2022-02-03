import {
  NCInstantStorageClassName,
  NCStorage,
  NCStorageClassName,
} from "./NCStorage";
import { Inject } from "../../di/Inject";
import { NCJsonSerializer } from "../../utils/NCJsonSerializer";

export class NCPersistance {
  private storage: NCStorage;

  constructor(isInstant = false) {
    this.storage = Inject(
      isInstant ? NCInstantStorageClassName : NCStorageClassName
    );
  }

  put(key: string, value: string) {
    this.storage.save(key, value);
  }

  get(key: string, defaultValue: string | null = null) {
    return this.storage.load(key) || defaultValue;
  }

  delete(key: string) {
    return this.storage.delete(key);
  }

  // conviniences

  putNumber(key: string, value: number) {
    this.put(key, value.toString());
  }

  putObject<T>(key: string, value: T) {
    this.put(key, NCJsonSerializer.encode(value));
  }

  getNumber(key: string, defaultValue: number = 0) {
    return Number(this.get(key) || defaultValue);
  }

  getObject<T>(key: string): Promise<T | null> {
    return this.get(key).then((json) => {
      if (!json) return null;
      return NCJsonSerializer.decode<T>(json);
    });
  }
}
