import { NCApplicationConfiguration, NCDefaultApplicationConfiguration } from "./NCApplicationConfiguration";
import { ServiceLocator } from "./di/ServiceLocator";
import { NCLog, NCLogLevel } from "./utils/NCLog";
import { NCDatingClassName } from "./utils/date/NCDating";
import { JSDateDating } from "./utils/date/JSDateDating";
import {
  NCInstantStorageClassName,
  NCStorageClassName,
} from "./IO/persistant/NCStorage";
import { MemoryStorage } from "./IO/persistant/MemoryStorage";

export class NCApplicationContext {
  // Singleton
  private static _instance: NCApplicationContext | null = null;

  static createContext(configuration: NCApplicationConfiguration) {
    if (NCApplicationContext._instance !== null) {
      throw new Error("Global Application Context has already created");
    }

    NCApplicationContext._instance = new NCApplicationContext(configuration);
    return NCApplicationContext._instance;
  }

  static get global() {
    if (NCApplicationContext._instance === null) {
      throw new Error("Global Application Context has not been created");
    }
    return NCApplicationContext._instance!!;
  }

  ///

  private _modeDev = false;
  private _serviceLocator: ServiceLocator;

  private constructor(configuration: NCApplicationConfiguration = new NCDefaultApplicationConfiguration()) {
    this._serviceLocator = new ServiceLocator();

    this.initDefaults();
    configuration.application(this);
    configuration.config(this._serviceLocator);
  }

  initDefaults = () => {
    // default dependencies
    this._serviceLocator.registFactory(
      NCDatingClassName,
      () => new JSDateDating()
    );
    this._serviceLocator.registFactory(
      NCInstantStorageClassName,
      () => new MemoryStorage()
    );
    this._serviceLocator.registFactory(
      NCStorageClassName,
      () => new MemoryStorage()
    );
  };

  set devMode(mode: boolean) {
    this._modeDev = mode;
  }

  get devMode() {
    return this._modeDev;
  }

  get container(): ServiceLocator {
    return this._serviceLocator;
  }

  get serviceLocator(): ServiceLocator {
    return this._serviceLocator;
  }
}
