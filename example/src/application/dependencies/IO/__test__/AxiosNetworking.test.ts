import { AxiosNetworking } from "../AxiosNetworking";
import axios, { AxiosRequestConfig } from "axios";
import { NCNetworkMethod } from "@ncodedcode/ncode_react_lib";

describe("AxiosNetworking test", () => {
  describe("baseUrl test", () => {
    const baseUrl = "https://jsonplaceholder.typicode.com";
    const axiosNetworking = new AxiosNetworking(baseUrl);

    let reqConfig: AxiosRequestConfig;
    axios.interceptors.request.use((config) => {
      reqConfig = config;
      return config;
    });

    test('request to "path"', async () => {
      const path = "/users/1";
      await axiosNetworking.execute(
        NCNetworkMethod.GET,
        path,
        undefined,
        undefined,
        {},
        true
      );
      expect(reqConfig.url).toBe(`${baseUrl}${path}`);
    });
    test('request to "full url"', async () => {
      const anotherUrl = "http://worldtimeapi.org/api";
      await axiosNetworking.execute(
        NCNetworkMethod.GET,
        anotherUrl,
        undefined,
        undefined,
        {},
        true
      );
      expect(reqConfig.url).toBe(anotherUrl);
    });
  });
});

export {};
