import { NCNetworking, NCNetworkMethod } from "../NCNetworking";
import { NCNetworkResponse } from "../NCNetworkResponse";

export class AxiosNetworkingTest implements NCNetworking {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  addCommonHeader(key: string, value: string): void {}

  commonHeaders(): { [p: string]: string } {
    return {};
  }

  deleteCommonHeader(key: string): void {}

  execute(
    method: NCNetworkMethod,
    url: string,
    queryParam: { [p: string]: any } | undefined,
    requestBody: { [p: string]: any } | FormData | undefined,
    header: { [p: string]: string },
    applyCommonHeader: boolean
  ): Promise<NCNetworkResponse> {
    const headers: { [p: string]: string } = {};

    const config: AxiosRequestConfigTest = {
      method: method as MethodTest,
      url: url.startsWith("http") ? url : `${this._baseUrl}${url}`,
      headers,
      params: queryParam,
      data: requestBody,
    };

    return axiosTest
      .request(config)
      .then((res) => {
        const status = res.status;
        const data = res.data;
        return new NCNetworkResponse(status, "", data);
      })
      .catch((e) => {
        const status = e.response?.status || 999;
        const message = e.response?.data.message;
        const data = e.response?.data || "";
        return new NCNetworkResponse(status, message, data);
      });
  }
}

type AxiosRequestConfigTest = {
  method: MethodTest;
  url: string;
  headers: { [p: string]: string };
  params: { [p: string]: any } | undefined;
  data: { [p: string]: any } | FormData | undefined;
};

type MethodTest =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

const axiosTest = {
  request: (
    config: AxiosRequestConfigTest,
    isResolved: boolean = true
  ): Promise<axiosTestResponse> => {
    return new Promise((resolve, reject) => {
      if (!isResolved) {
        const rejectResponse: axiosTestResponse = {
          data: { message: "fail", config },
          status: 404,
        };
        reject(rejectResponse);
      }

      const resolveResponse: axiosTestResponse = {
        data: { message: "success", config },
        status: 200,
      };
      resolve(resolveResponse);
    });
  },
};

type axiosTestResponse = {
  data: { [key: string]: any; message: string };
  status: number;
};
