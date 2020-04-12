import { RequestOptionsInit, ResponseError } from 'umi-request';
import request from '@/utils/request';
import { Toast } from 'antd-mobile';
// import { chenkTokenIsExpireReload, tokenIsExpire } from '@/pages/auth/models/auth';

const codeMap = {
  '500': `抱歉，服务器开小差了，
  \`(*>﹏<*)′`,
  '403': `认证设备
  \`(*>﹏<*)′`,
};

/**
 * 附加选项
 */
export interface RequestAdditionOption {
  needToken: boolean,
  /**
   * 错误回调
   * @param error
   */
  errorHandler?: (error: ResponseError) => void,
  codeMap?: { [key: string]: string }
}

const defaultRequestAdditionOption: RequestAdditionOption = {
  needToken: true,
};

/**
 * @param url
 * @param options
 * @param requestAdditionOption
 */
export default function base(url: string, options: RequestOptionsInit = {}, requestAdditionOption: RequestAdditionOption): any {
//   if (requestAdditionOption.needToken) {
//     let headers: Record<string, string> = {};
//     //有token并且没有过期
//     const tokenAndExpireIn = tokenIsExpire()
//     if (tokenAndExpireIn) {
//       headers['Authorization'] = `Bearer ${tokenAndExpireIn['token']}`;
//       options.headers = {
//         ...options.headers,
//         ...headers,
//       }
//     } else {
//       chenkTokenIsExpireReload()
//     }
//   }

  if (requestAdditionOption.errorHandler) {
    options.errorHandler = requestAdditionOption.errorHandler;
  } else {
    options.errorHandler = error => {
      console.error('request error', error.data);
      const _codeMap = { ...codeMap, ...requestAdditionOption.codeMap };
      // @ts-ignore
      let failMessage = _codeMap[error.response.status];
      if (!failMessage) {
        failMessage = error.data.detail ? error.data.detail : error.data.message;
      }
      Toast.fail(failMessage);
      throw error;
    };
  }
  return request(url, options);
}

export function query({ url, params, options, requestAdditionOption }: { url: string, params?: any, options?: RequestOptionsInit, requestAdditionOption?: RequestAdditionOption }): any {
  requestAdditionOption = { ...defaultRequestAdditionOption, ...requestAdditionOption };
  return base(url, {
    ...options,
    method: 'get',
    params,
  }, requestAdditionOption);
}

export function create({ url, params, options, requestAdditionOption }: { url: string, params: any, options?: RequestOptionsInit, requestAdditionOption?: RequestAdditionOption }) {
  requestAdditionOption = { ...defaultRequestAdditionOption, ...requestAdditionOption };
  return base(url, {
    ...options,
    method: 'post',
    requestType: 'json',
    data: params,
  }, requestAdditionOption);
}

export function update({ url, params, key = 'id', options, requestAdditionOption }: { url: string, params?: any, key?: string, options?: RequestOptionsInit, requestAdditionOption?: RequestAdditionOption }) {
  if (!requestAdditionOption) {
    requestAdditionOption = {
      needToken: true,
    };
  }
  if (params && params[key]) {
    url = `${url}/${params[key]}`;
    delete params[key];
  }
  return base(url, {
    ...options,
    method: 'put',
    requestType: 'json',
    data: params,
  }, requestAdditionOption);
}

export function remove({ url, params, key = 'id', options, requestAdditionOption }: { url: string, params?: any, key?: string, options?: RequestOptionsInit, requestAdditionOption?: RequestAdditionOption }) {
  if (!requestAdditionOption) {
    requestAdditionOption = {
      needToken: true,
    };
  }
  if (params && params[key]) {
    url = `${url}/${params[key]}`;
    delete params[key];
  }
  return base(url, {
    ...options,
    method: 'delete',
    requestType: 'json',
    data: params,
  }, requestAdditionOption);
}

