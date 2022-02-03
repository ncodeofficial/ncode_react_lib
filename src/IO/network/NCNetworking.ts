import { NCNetworkResponse } from "./NCNetworkResponse";

export const NCNetworkingClassName = "NCNetworking";

export interface NCNetworking {
  execute(
    method: NCNetworkMethod,
    url: string,
    queryParam: { [key: string]: any } | undefined,
    requestBody: { [key: string]: any } | FormData | undefined,
    header: { [key: string]: string },
    applyCommonHeader: boolean
  ): Promise<NCNetworkResponse>;

  addCommonHeader(key: string, value: string): void;

  commonHeaders(): { [key: string]: string };

  deleteCommonHeader(key: string): void;
}

export enum NCNetworkMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
