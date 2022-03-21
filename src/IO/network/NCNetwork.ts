import {
  NCNetworking,
  NCNetworkingClassName,
  NCNetworkMethod,
} from "./NCNetworking";
import { Inject } from "../../di/Inject";
import { NCNetworkResponse } from "./NCNetworkResponse";
import { NCNetworkException } from "./NCNetworkException";

export class NCNetwork {
  private network: NCNetworking = Inject(NCNetworkingClassName);

  private execute(
    method: NCNetworkMethod,
    url: string,
    queryParam: { [key: string]: any } | undefined,
    requestBody: { [key: string]: any } | FormData | undefined,
    header: { [key: string]: string },
    applyCommonHeader: boolean
  ): Promise<NCNetworkResponse> {
    return this.network
      .execute(method, url, queryParam, requestBody, header, applyCommonHeader)
      .then((response) => {
        if (!response.isSuccess) {
          throw new NCNetworkException(
            response.status,
            response.message,
            response.data
          );
        }
        return response;
      });
  }

  get(
    url: string,
    queryParam: { [key: string]: any } = {},
    header: { [key: string]: string } = {},
    applyCommonHeader: boolean = true
  ) {
    return this.execute(
      NCNetworkMethod.GET,
      url,
      queryParam,
      undefined,
      header,
      applyCommonHeader
    );
  }

  post(
    url: string,
    requestBody: { [key: string]: any } | FormData = {},
    header: { [key: string]: string } = {},
    applyCommonHeader: boolean = true
  ) {
    return this.execute(
      NCNetworkMethod.POST,
      url,
      undefined,
      requestBody,
      header,
      applyCommonHeader
    );
  }

  // post가 queryParam을 받아야 하는 경우를 위해 작성함. ex) AuthRepository.findUserPassword()
  postWithQueryParam(
    url: string,
    queryParam: { [key: string]: any } = {},
    header: { [key: string]: string } = {},
    applyCommonHeader: boolean = true
  ) {
    return this.execute(
      NCNetworkMethod.POST,
      url,
      queryParam,
      undefined,
      header,
      applyCommonHeader
    );
  }

  put(
    url: string,
    requestBody: { [key: string]: any } = {},
    header: { [key: string]: string } = {},
    applyCommonHeader: boolean = true
  ) {
    return this.execute(
      NCNetworkMethod.PUT,
      url,
      undefined,
      requestBody,
      header,
      applyCommonHeader
    );
  }

  patch(
    url: string,
    requestBody: { [key: string]: any } = {},
    header: { [key: string]: string } = {},
    applyCommonHeader: boolean = true
  ) {
    return this.execute(
      NCNetworkMethod.PATCH,
      url,
      undefined,
      requestBody,
      header,
      applyCommonHeader
    );
  }

  delete(
    url: string,
    queryParam: { [key: string]: any } = {},
    header: { [key: string]: string } = {},
    applyCommonHeader: boolean = true
  ) {
    return this.execute(
      NCNetworkMethod.DELETE,
      url,
      queryParam,
      undefined,
      header,
      applyCommonHeader
    );
  }

  // TODO - kgh : 위의 delete 메소드가 requestBody를 받지 못하고 있음
  // 쇼핑백 상품 삭제의 경우 requestBody를 요구하므로, 임시로 하나 만들어 둠
  deleteWithRequestBody(
    url: string,
    requestBody: { [key: string]: any } = {},
    header: { [key: string]: string } = {},
    applyCommonHeader: boolean = true
  ) {
    return this.execute(
      NCNetworkMethod.DELETE,
      url,
      undefined,
      requestBody,
      header,
      applyCommonHeader
    );
  }

  addCommonHeader(key: string, value: string) {
    this.network.addCommonHeader(key, value);
  }

  commonHeaders() {
    return this.network.commonHeaders();
  }

  deleteCommonHeader(key: string) {
    this.network.deleteCommonHeader(key);
  }
}
