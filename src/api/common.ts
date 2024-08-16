import Qs from 'qs';
import axios from 'axios';
import ResponseDto from '@/dto/responseDto';

/**
 * 加载数据
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
export const loadData = (url: string, data: any): Promise<ResponseDto<any>> => {
  return axios.post(url, Qs.stringify(data));
};
