import {
  NCApplicationConfiguration,
  NCApplicationContext,
  NCDatingClassName,
  NCLog,
  NCNetworkingClassName,
  NCStorageClassName,
  ServiceLocator,
} from "@ncodedcode/ncode_react_lib";
import { DayjsDating } from "./dependencies/date/DayjsDating";
import { AxiosNetworking } from "./dependencies/IO/AxiosNetworking";
import { SessionStorage } from "./dependencies/IO/SessionStorage";
import {
  CounterViewModelClassName,
  CounterViewModelClassName2,
  CounterViewModelImpl,
} from "./pages/counter/CounterViewModel";
import { UTCRepositoryClassName } from "../data/repositories/UTCRepository";
import { UTCRepositoryImpl } from "../data/repositories/UTCRepositoryImpl";
import {
  WatchViewModelClassName,
  WatchViewModelImpl,
} from "./pages/watch/WatchViewModel";
import { UTCServiceClassName } from "../domain/services/UTCService";
import { UTCServiceImpl } from "../domain/services/UTCServiceImpl";
import { NCLogLevel } from "@ncodedcode/ncode_react_lib/dist/utils/NCLog";

export class AppConfiguration implements NCApplicationConfiguration {
  application(app: NCApplicationContext): void {
    app.devMode = process.env.REACT_APP_ENV_TYPE === "dev";
    NCLog.setLogLevel(NCLogLevel.Debug);
  }

  config(container: ServiceLocator): void {
    container.registFactory(NCDatingClassName, () => new DayjsDating());
    container.registFactory(NCStorageClassName, () => new SessionStorage());
    container.registFactory(NCNetworkingClassName, () => new AxiosNetworking());

    // set ViewModels
    this.configViewModels(container);

    // set Services
    this.configServices(container);

    // set Repositories
    this.configRepositories(container);
  }

  private configViewModels(container: ServiceLocator) {
    container.registFactory(
      CounterViewModelClassName,
      () => new CounterViewModelImpl()
    );
    container.registSingle(
      CounterViewModelClassName2,
      () => new CounterViewModelImpl()
    );
    container.registFactory(
      WatchViewModelClassName,
      (con) => new WatchViewModelImpl(con.resolve(UTCServiceClassName))
    );
  }

  private configServices(container: ServiceLocator) {
    container.registSingle(
      UTCServiceClassName,
      (con) => new UTCServiceImpl(con.resolve(UTCRepositoryClassName))
    );
  }

  private configRepositories(container: ServiceLocator) {
    container.registSingle(
      UTCRepositoryClassName,
      () => new UTCRepositoryImpl()
    );
  }
}
