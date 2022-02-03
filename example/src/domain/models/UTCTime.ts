import { NCDate } from "@ncodedcode/ncode_react_lib";

export class UTCTime {
  timezone: string;
  date: NCDate;

  constructor(timezone: string, date: NCDate) {
    this.timezone = timezone;
    this.date = date;
  }
}
