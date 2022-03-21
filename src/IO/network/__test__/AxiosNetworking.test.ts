import { AxiosNetworkingTest } from "./AxiosNetworkingTest";
import { NCNetworkMethod } from "../NCNetworking";
import { NCNetworkResponse } from "../NCNetworkResponse";

describe("AxiosNetworking tests", () => {
  const baseUrl = "http://worldtimeapi.org/api";
  const additionalUrl = "/timezone/Etc/UTC";
  const axiosNetworkingTest = new AxiosNetworkingTest(baseUrl);

  describe("baseUrl initialize test", () => {
    let res: NCNetworkResponse | undefined;

    beforeAll(async () => {
      res = await axiosNetworkingTest.execute(
        NCNetworkMethod.GET,
        additionalUrl,
        undefined,
        undefined,
        {},
        false
      );
    });

    test('api should request with "baseUrl(http://worldtimeapi.org/api)"', () => {
      expect(res?.data.config.url.startsWith(baseUrl)).toBe(true);
    });
    test('url should includes "additionalUrl(/timezone/Etc/UTC)"', () => {
      expect(res?.data.config.url.includes(additionalUrl)).toBe(true);
    });
  });

  describe('api should request with "another url"', () => {
    const anotherUrl = "http://naver.com";
    let res: NCNetworkResponse | undefined;

    beforeAll(async () => {
      res = await axiosNetworkingTest.execute(
        NCNetworkMethod.GET,
        anotherUrl,
        undefined,
        undefined,
        {},
        false
      );
    });

    test("should not request with baseUrl(http://worldtimeapi.org/api)", () => {
      expect(res?.data.config.url.startsWith(baseUrl)).toBe(false);
    });
    test('should request with "another url(http://naver.com)"', () => {
      expect(res?.data.config.url).toBe(`${anotherUrl}`);
    });
  });
});
