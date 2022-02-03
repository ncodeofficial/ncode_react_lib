export class NCJsonSerializer {
  static encode<T>(obj: T): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  }

  static decode<T>(json: string) {
    return JSON.parse(decodeURIComponent(escape(atob(json)))) as T;
  }
}
