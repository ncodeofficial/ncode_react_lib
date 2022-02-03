export class NCNetworkResponse {
  status: number;
  message: string;
  data: any;

  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  get isSuccess() {
    return Math.floor(this.status / 100) === 2;
  }

  toString(): string {
    return `(${this.status}) ${this.message}\n${this.data}`;
  }
}
