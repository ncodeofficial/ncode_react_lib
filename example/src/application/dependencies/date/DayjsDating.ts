import dayjs, { Dayjs, OpUnitType, QUnitType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import duration, { DurationUnitType } from "dayjs/plugin/duration";
import { NCDating } from "@ncodedcode/ncode_react_lib";

export class DayjsDating implements NCDating {
  private _day: Dayjs = dayjs();

  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(relativeTime);
    dayjs.extend(duration);
  }

  now(): NCDating {
    this._day = dayjs();
    return this;
  }

  create(m: number): NCDating {
    this._day = dayjs(m);
    return this;
  }

  fromDate(d: Date): NCDating {
    this._day = dayjs(d);
    return this;
  }

  parse(date: string): NCDating {
    const adjusted = date.replace(/(\+\d{2})(\d{2})$/, "$1:$2"); // for iOS 11.x
    this._day = dayjs(adjusted);
    return this;
  }

  year(): number {
    return this._day.year();
  }

  month(): number {
    return this._day.month() + 1;
  }

  day(): number {
    return this._day.date();
  }

  dayOfWeek(): number {
    return this._day.day();
  }

  hour(): number {
    return this._day.hour();
  }

  minute(): number {
    return this._day.minute();
  }

  second(): number {
    return this._day.second();
  }

  isPast(): boolean {
    const now = dayjs().valueOf();
    const target = this.millis();
    return now > target;
  }

  isFuture(): boolean {
    const now = dayjs().valueOf();
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
    return this._day.utc().toISOString();
  }

  format(f: string) {
    return this._day.format(f);
  }

  millis(): number {
    return this._day.valueOf();
  }

  toDate(): Date {
    return this._day.toDate();
  }

  currentTimezone(): string {
    return dayjs.tz.guess();
  }

  addDayTo(day: number): NCDating {
    this._day = this._day.add(day, "day");
    return this;
  }

  diff(date: Date, unit?: QUnitType | OpUnitType, float?: boolean): number {
    return this._day.diff(dayjs(date), unit, float);
  }

  duration(
    millisecond: number,
    format: string,
    unit: DurationUnitType = "milliseconds"
  ): string {
    return dayjs.duration(millisecond, unit).format(format);
  }
}
