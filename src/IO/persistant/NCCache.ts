import { Inject } from "../../di/Inject";
import { NCJsonSerializer } from "../../utils/NCJsonSerializer";
import {
  NCInstantStorageClassName,
  NCStorage,
  NCStorageClassName,
} from "./NCStorage";

class DataRecord<T> {
  data: T;
  expiredAt: number;

  constructor(data: T, expiredAt: number) {
    this.data = data;
    this.expiredAt = expiredAt;
  }
}

export class NCCache {
  static EXPIRED_A_MINUTE = 60 * 1000;
  static EXPIRED_A_HOUR = 60 * NCCache.EXPIRED_A_MINUTE;
  static EXPIRED_A_DAY = 24 * NCCache.EXPIRED_A_HOUR;

  static DEFAULT_EXPIRED_REMAIN = 12 * NCCache.EXPIRED_A_HOUR;

  private storage: NCStorage;

  constructor(isInstant = true) {
    this.storage = Inject(
      isInstant ? NCInstantStorageClassName : NCStorageClassName
    );
  }

  private nowInMilli() {
    return new Date().getTime();
  }

  put(
    key: string,
    value: string,
    expiredAfter: number = NCCache.DEFAULT_EXPIRED_REMAIN
  ) {
    const cacheKey = `cache-${key}`;
    const expiredAt = this.nowInMilli() + expiredAfter;
    const record = new DataRecord(value, expiredAt);
    this.storage.save(cacheKey, NCJsonSerializer.encode(record)).then(() => {});
  }

  get(key: string): Promise<string | null> {
    const cacheKey = `cache-${key}`;
    return this.storage.load(cacheKey).then((recordJson) => {
      if (!recordJson) return null;

      const record: DataRecord<string> = NCJsonSerializer.decode(recordJson);
      const now = this.nowInMilli();

      if (record.expiredAt <= now) {
        this.storage.delete(cacheKey).then(() => {});
        return null;
      }

      return record.data;
    });
  }

  // conviniences

  putNumber(
    key: string,
    value: number,
    expiredAfter: number = NCCache.DEFAULT_EXPIRED_REMAIN
  ) {
    this.put(key, value.toString(), expiredAfter);
  }

  putObject<T>(
    key: string,
    value: T,
    expiredAfter: number = NCCache.DEFAULT_EXPIRED_REMAIN
  ) {
    this.put(key, NCJsonSerializer.encode(value), expiredAfter);
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
