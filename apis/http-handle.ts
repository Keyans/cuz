import type { AxiosRequestConfig } from "axios";
import { debounce } from "lodash";
import { TOKEN_OVERDUE, type R, type RequestData } from "~/apis/http.type";

abstract class AbstractHttp {
  protected abstract doRequest(
    url: string,
    config: AxiosRequestConfig,
    data?: any
  ): Promise<R>;

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
  }: RequestData): Promise<R> {
    // FullScreenLoadingHelper.openLoading(showLoading)
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
          if (res) {
            resolve(res);
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
  doRequest(url: string, config: AxiosRequestConfig, data?: any): Promise<R> {
    return useNuxtApp().$apiFetch(url, {
      method: "GET",
      params: data || config, // params 是用于 GET 请求的查询参数
    });
  }
}

export class HttpPost extends AbstractHttp {
  doRequest(url: string, config: AxiosRequestConfig, data?: any): Promise<R> {
    return useNuxtApp().$apiFetch(url, {
      method: "POST",
      body: data || config, // body 是 POST 请求的请求体数据
    });
  }
}

export class HttpPut extends AbstractHttp {
  doRequest(url: string, config: AxiosRequestConfig, data?: any): Promise<R> {
    return useNuxtApp().$apiFetch(url, {
      method: "PUT",
      body: data || config, // body 是 PUT 请求的请求体数据
    });
  }
}

export class HttpDelete extends AbstractHttp {
  doRequest(url: string, config: AxiosRequestConfig, data?: any): Promise<R> {
    return useNuxtApp().$apiFetch(url, {
      method: "DELETE",
      body: data || config, // body 是 DELETE 请求的请求体数据
    });
  }
}

export class HttpPatch extends AbstractHttp {
  doRequest(url: string, config: AxiosRequestConfig, data?: any): Promise<R> {
    return useNuxtApp().$apiFetch(url, {
      method: "PATCH",
      body: data || config, // body 是 PATCH 请求的请求体数据
    });
  }
}

export class HttpHead extends AbstractHttp {
  doRequest(url: string, config: AxiosRequestConfig, data?: any): Promise<R> {
    return useNuxtApp().$apiFetch(url, {
      method: "HEAD",
      body: data || config, // HEAD 请求没有请求体，但我们仍然支持传递参数
    });
  }
}

export class HttpOptions extends AbstractHttp {
  doRequest(url: string, config: AxiosRequestConfig, data?: any): Promise<R> {
    return useNuxtApp().$apiFetch(url, {
      method: "OPTIONS",
      body: data || config, // OPTIONS 请求没有请求体，但我们仍然支持传递参数
    });
  }
}
