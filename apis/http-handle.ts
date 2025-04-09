import request from "./axiosConfig";
import type { RequestData, R } from "./http.type";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { TOKEN_OVERDUE } from "./http.type";
import debounce from "lodash/debounce";

abstract class AbstractHttp {
  protected abstract doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>>;

  /**
   * @param url 请求url
   * @param params url请求参数
   * @param data 请求体数据
   * @param showLoading  是否显示loading
   */
  request({
    url,
    params = {},
    data = {},
    showLoading = true,
  }: RequestData): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      this.doRequest(
        url,
        {
          data,
          params,
        },
        data
      )
        .then((res) => {
          if (res?.data) {
            resolve(res.data);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          this.errHandler(err);
          reject(err);
        });
    });
  }

  private static notify(msg: string): void {
    // @ts-ignore
    // ElNotification.error({
    //   title: "错误",
    //   message: msg,
    // });
    console.error(msg);
  }
  // @ts-ignore
  private static debounceNotify = debounce(AbstractHttp.notify, 500);
  //错误处理
  private errHandler(error: any): void {
    if (TOKEN_OVERDUE.includes(error.code)) return;
    if (!error.msg) {
      // @ts-ignore
      AbstractHttp.debounceNotify("响应错误");
      return;
    }
    let promise = Promise.resolve().then(() => {
      // @ts-ignore
      AbstractHttp.debounceNotify(error.msg);
    });

    if (error.data) {
      (<Array<string>>error.data).forEach((msg) => {
        if (!msg) {
          return;
        }
        promise = promise.then(() => {
          // @ts-ignore
          AbstractHttp.debounceNotify(msg);
        });
      });
    }
  }
}

export class HttpGet extends AbstractHttp {
  doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>> {
    return request.get<R>(url, config);
  }
}

export class HttpPost extends AbstractHttp {
  doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>> {
    return request.post<R>(url, data, config);
  }
}

export class HttpPut extends AbstractHttp {
  doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>> {
    return request.put<R>(url, data, config);
  }
}

export class HttpDelete extends AbstractHttp {
  doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>> {
    return request.delete<R>(url, { ...config, data: data });
  }
}

export class HttpPatch extends AbstractHttp {
  doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>> {
    return request.patch<R>(url, data, config);
  }
}

export class HttpHead extends AbstractHttp {
  doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>> {
    return request.head<R>(url, config);
  }
}

export class HttpOptions extends AbstractHttp {
  doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<AxiosResponse<R>> {
    return request.options<R>(url, config);
  }
}
