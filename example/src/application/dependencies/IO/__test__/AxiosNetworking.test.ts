import { AxiosNetworking } from "../AxiosNetworking";
import axios, { AxiosRequestConfig } from "axios";
import {
  NCApplicationConfiguration,
  NCApplicationContext,
  NCLog,
  NCNetwork,
  NCNetworkingClassName,
} from "@ncodedcode/ncode_react_lib";
import { NCLogLevel } from "@ncodedcode/ncode_react_lib/dist/utils/NCLog";
import { ServiceLocator } from "../../../../../../src";

class MockAppConfiguration implements NCApplicationConfiguration {
  application(app: NCApplicationContext): void {
    app.devMode = process.env.REACT_APP_ENV_TYPE === "dev";
    NCLog.setLogLevel(NCLogLevel.Debug);
  }

  config(locator: ServiceLocator): void {
    locator.registFactory(
      NCNetworkingClassName,
      () => this._dependencies.NCNetworking
    );
  }

  private _dependencies: { [key: string]: any } = {};

  constructor(dependencies: { [key: string]: any }) {
    this._dependencies = dependencies;
  }
}

describe("AxiosNetworking test", () => {
  describe("baseUrl test", () => {
    const baseUrl = `${process.env.REACT_APP_TEST_BASE_URL}`;
    const path = "/users/1";

    NCApplicationContext.createContext(
      new MockAppConfiguration({ NCNetworking: new AxiosNetworking(baseUrl) })
    );

    let reqConfig: AxiosRequestConfig;
    axios.interceptors.request.use((config) => {
      reqConfig = config;
      return config;
    });

    test('request to "path"', async () => {
      await new NCNetwork().get(path);
      expect(reqConfig.url).toBe(`${baseUrl}${path}`);
    });

    test('request to "full url"', async () => {
      const anotherUrl = `${process.env.REACT_APP_WORLD_TIME_API_URL}`;
      await new NCNetwork().get(anotherUrl);
      expect(reqConfig.url).toBe(anotherUrl);
    });
  });
});

export {};
