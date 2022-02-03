export const NCInstantStorageClassName = "NCInstantStorage";
export const NCStorageClassName = "NCStorage";

export interface NCStorage {
  save(key: string, value: string): Promise<boolean>;

  load(key: string): Promise<string | null>;

  contains(key: string): Promise<boolean>;

  delete(key: string): Promise<boolean>;
}
