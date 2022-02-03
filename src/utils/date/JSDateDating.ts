import { NCDating } from "./NCDating";

export class JSDateDating implements NCDating {
  private _date = new Date();

  now(): NCDating {
    this._date = new Date();
    return this;
  }

  create(m: number): NCDating {
    this._date = new Date(m);
    return this;
  }

  fromDate(d: Date): NCDating {
    this._date = new Date(d);
    return this;
  }

  parse(date: string): NCDating {
    const adjusted = date.replace(/(\+\d{2})(\d{2})$/, "$1:$2"); // for iOS 11.x
    this._date = new Date(adjusted);
    return this;
  }

  year(): number {
    return this._date.getFullYear();
  }

  month(): number {
    return this._date.getMonth() + 1;
  }

  day(): number {
    return this._date.getDate();
  }

  dayOfWeek(): number {
    return this._date.getDay();
  }

  hour(): number {
    return this._date.getHours();
  }

  minute(): number {
    return this._date.getMinutes();
  }

  second(): number {
    return this._date.getSeconds();
  }

  isPast(): boolean {
    const now = new Date().getTime();
    const target = this.millis();
    return now > target;
  }

  isFuture(): boolean {
    const now = new Date().getTime();
    const target = this.millis();
    return now < target;
  }

  compare(target: NCDating): number {
    const me = this.millis();
    const other = target.millis();
    const diff = me - other;
    if (diff === 0) return 0;
    return diff < 0 ? -1 : 1;
  }

  isoFormat(): string {
    return this._date.toISOString();
  }

  format(f: string) {
    return f
      .replace("yyyy", `${this.year()}`)
      .replace("MM", `${this.month()}`)
      .replace("DD", `${this.day()}`)
      .replace("HH", `${this.hour()}`)
      .replace("mm", `${this.minute()}`)
      .replace("ss", `${this.second()}`);
  }

  millis(): number {
    return this._date.getTime();
  }

  toDate(): Date {
    return this._date;
  }

  currentTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  addDayTo(day: number): NCDating {
    this._date.setDate(this._date.getDate() + day);
    return this;
  }

  diff(date: Date, unit?: any, float?: boolean): number {
    throw new Error("diff not supported");
    return -1;
  }

  duration(
    millisecond: number,
    format: string,
    unit: string = "milliseconds"
  ): string {
    throw new Error("duration not supported");
    return "";
  }
}
