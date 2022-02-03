export enum NCLogLevel {
  Verbose,
  Debug,
  Warning,
  Error,
}

export class NCLog {
  static v = console.info;
  static d = console.log;
  static w = console.warn;
  static e = console.error;
  static assert = console.assert;
  static trace = console.trace;

  static setLogLevel(level: NCLogLevel) {
    NCLog.v = () => {};
    NCLog.d = () => {};
    NCLog.w = () => {};
    NCLog.assert = () => {};

    if (NCLogLevel.Verbose >= level) NCLog.v = console.info;
    if (NCLogLevel.Debug >= level) NCLog.d = console.log;
    if (NCLogLevel.Debug >= level) NCLog.assert = console.assert;
    if (NCLogLevel.Warning >= level) NCLog.w = console.warn;
  }
}
