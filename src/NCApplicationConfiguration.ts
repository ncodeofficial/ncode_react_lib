import { NCLog } from ".";
import { ServiceLocator } from "./di/ServiceLocator";
import { NCApplicationContext } from "./NCApplicationContext";
import { NCLogLevel } from "./utils/NCLog";

export interface NCApplicationConfiguration {
  application(app: NCApplicationContext): void;
  config(locator: ServiceLocator): void;
}

export class NCDefaultApplicationConfiguration
  implements NCApplicationConfiguration
{
  application(app: NCApplicationContext): void {
    NCLog.setLogLevel(NCLogLevel.Debug);
  }
  config(locator: ServiceLocator): void {}
}
