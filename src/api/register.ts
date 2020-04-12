import { RequestResponse, ResponseError } from 'umi-request';
import { query } from './base';

export function getInfo(params: string): Promise<RequestResponse<any>> {
    return query({
        url: `/users`,
        params
    })
}