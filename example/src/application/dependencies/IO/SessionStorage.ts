import { NCStorage } from "@ncodedcode/ncode_react_lib";

export class SessionStorage implements NCStorage {
  contains(key: string): Promise<boolean> {
    return Promise.resolve(!!sessionStorage.getItem(key));
  }

  delete(key: string): Promise<boolean> {
    return this.contains(key).then((exist) => {
      if (exist) sessionStorage.removeItem(key);
      return exist;
    });
  }

  load(key: string): Promise<string | null> {
    return Promise.resolve(sessionStorage.getItem(key) || null);
  }

  save(key: string, value: string): Promise<boolean> {
    if (!value) return this.delete(key);
    sessionStorage.setItem(key, value);
    return Promise.resolve(true);
  }
}
