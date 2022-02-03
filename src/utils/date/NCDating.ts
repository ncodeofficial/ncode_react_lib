export const NCDatingClassName = "NCDating";

export interface NCDating {
  /**
   * 생성
   */
  now(): NCDating; // 현재시간으로 생성
  create(m: number): NCDating; // 밀리세컨드로부터 생성
  fromDate(d: Date): NCDating; // Date 로부터 생성
  parse(date: string): NCDating; // 문자열로부터 설정
  addDayTo(day: number): NCDating;

  diff(date: Date, unit?: string, float?: boolean): number;

  /**
   * 정보 얻기
   */
  year(): number; // 년
  month(): number; // 월
  day(): number; // 일
  hour(): number; // 시
  minute(): number; // 분
  second(): number; // 초

  dayOfWeek(): number;

  /**
   * 비교
   */
  isPast(): boolean; // 미래인지 확인
  isFuture(): boolean; // 과거인지 확인
  compare(target: NCDating): number; // -1, 0, 1

  /**
   * 특정 형태로 포맷
   */
  isoFormat(): string;

  format(f: string): string;

  /**
   * 다른 포맷으로 변경
   */
  millis(): number; // 밀리세컨드 시간
  toDate(): Date; // Date 로 반환

  /**
   * I18N
   */
  currentTimezone(): string; // 현재 타임존

  /*
   * duration
   */
  duration(millisecond: number, format: string, unit?: string): string;
}
