export class NCNetworkException extends Error {
  status: number;
  _data?: any;

  constructor(status: number, message: string, data: any) {
    super(message);
    this.status = status;
    this._data = data;
  }

  toString(): string {
    return `(${this.status}) : ${this.message}`;
  }

  get data() {
    return this._data;
  }
}
