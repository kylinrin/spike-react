import { extend, RequestMethod } from 'umi-request';

const apiBase = process.env.API_BASE + '/'
// const apiBase = '/';

const prefix = 'api';

const request: RequestMethod = extend({
  prefix: apiBase + prefix,
  cache: 'no-cache',
  getResponse: true,
});

export default request;
