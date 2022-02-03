import { NCDating, NCDatingClassName } from "./NCDating";
import { Inject } from "../../di/Inject";

export enum NCDateUnit {
  millisecond = "millisecond",
  second = "second",
  minute = "minute",
  hour = "hour",
  day = "day",
  month = "month",
  year = "year",
  date = "date",
  milliseconds = "milliseconds",
  seconds = "seconds",
  minutes = "minutes",
}

export const getNCDateToString = (
  date?: NCDate,
  format: string = NCDate.FORMAT_LOCAL_DATE_COMMA
) => {
  return date ? date.toString(format) : "";
};

export class NCDate {
  static FORMAT_UTC_ISO = "NCDATE_FORMAT_UTC_ISO";
  static FORMAT_LOCAL_DATETIME = "YYYY-MM-DD HH:mm:ss";
  static FORMAT_LOCAL_DATETIME_COMMA = "YYYY.MM.DD HH:mm";
  static FORMAT_LOCAL_DATE = "YYYY-MM-DD";
  static FORMAT_LOCAL_DATE_COMMA = "YYYY.MM.DD";
  static FORMAT_LOCAL_MONTH_DAY_WEEK_COMMA = "MM.DD ddd";
  static FORMAT_MONTH_DATE_YEAR = "MMM D, YYYY";
  static FORMAT_MONTH_DATE = "M월 D일";

  private dating: NCDating;

  private constructor(dating: NCDating) {
    this.dating = dating;
  }

  private static resolveDating = () => Inject<NCDating>(NCDatingClassName);

  static now(): NCDate {
    return new NCDate(NCDate.resolveDating().now());
  }

  static create(milliseconds: number): NCDate {
    return new NCDate(NCDate.resolveDating().create(milliseconds));
  }

  static duration(milliseconds: number, format: string, unit?: string): string {
    return NCDate.resolveDating().duration(milliseconds, format, unit);
  }

  static fromDate(date: Date): NCDate {
    return new NCDate(NCDate.resolveDating().fromDate(date));
  }

  static parse(dateString: string): NCDate {
    return new NCDate(NCDate.resolveDating().parse(dateString));
  }

  toString(format: string = NCDate.FORMAT_UTC_ISO): string {
    if (format === NCDate.FORMAT_UTC_ISO) return this.dating.isoFormat();
    return this.dating.format(format);
  }

  toMilliseconds(): number {
    return this.dating.millis();
  }

  toDate(): Date {
    return this.dating.toDate();
  }

  toCommaYYMMDD = () => {
    return this.dating.format(NCDate.FORMAT_LOCAL_DATE_COMMA).slice(2);
  };

  /**
   * 날짜 정보
   */
  year = () => this.dating.year();
  month = () => this.dating.month();
  day = () => this.dating.day();
  hour = () => this.dating.hour();
  minute = () => this.dating.minute();
  second = () => this.dating.second();

  monthName = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[this.month() - 1];
  };

  monthNameShort = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[this.month() - 1];
  };

  monthNameKo = () => {
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    return months[this.month() - 1];
  };

  isAm = () => this.hour() < 12;
  isPm = () => !this.isAm();

  weekDay = () => this.dating.dayOfWeek();
  weekDayName = () => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[this.dating.dayOfWeek()];
  };

  weekDayNameShort = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays[this.dating.dayOfWeek()];
  };

  weekDayNameKo = () => {
    const weekdays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return weekdays[this.dating.dayOfWeek()];
  };

  weekDayNameKoShort = () => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[this.dating.dayOfWeek()];
  };

  convertDateToText = (): string => {
    return `${this.dating.year()}.${this.dating.month()}.${this.dating.day()} ${
      this.dating.hour() <= 12
        ? `${this.dating.hour()}AM`
        : `${this.dating.hour() - 12}PM`
    }`;
  };

  convertDateToTextWithoutTime = (): string => {
    return `${this.dating.year()}.${this.dating.month()}.${this.dating.day()}`;
  };

  isPast = () => this.dating.isPast();
  isFuture = () => this.dating.isFuture();
  isClosing = () => {
    const target = NCDate.fromDate(this.dating.toDate()).addDay(-2);
    return NCDate.now().isLaterThen(target);
  };

  isEarlierThen = (target: NCDate) => {
    return this.dating.compare(target.dating) < 0;
  };
  isLaterThen = (target: NCDate) => {
    return this.dating.compare(target.dating) > 0;
  };

  // 초 단위까지 동일 시간인지 비교 (밀리세컨드는 비교하지 않음)
  equals = (target: NCDate | Date | number) => {
    const myMilli = this.toMilliseconds();
    let targetMilli = 0;
    if (target instanceof NCDate) {
      targetMilli = target.toMilliseconds();
    } else if (target instanceof Date) {
      targetMilli = target.getTime();
    } else {
      targetMilli = target;
    }
    return Math.floor(myMilli / 1000) === Math.floor(targetMilli / 1000);
  };

  // 시간빼고 날짜만 비교
  dateEquals = (target: NCDate) => {
    const myDate = this.toString(NCDate.FORMAT_LOCAL_DATE);
    const targetDate = target.toString(NCDate.FORMAT_LOCAL_DATE);
    return myDate === targetDate;
  };

  // 현재일에서 더하기
  addDay = (day: number) => {
    return new NCDate(this.dating.addDayTo(day));
  };

  // 시간 비교
  diff(date: NCDate, unit?: NCDateUnit, float = false): number {
    const _date = date.toDate();
    return this.dating.diff(_date, unit, float);
  }
}
