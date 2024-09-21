import axios from 'axios';
import ResponseDto from '@/dto/responseDto';
import { AnyObject } from '@/types/global';

export interface ContentDataRecord {
  x: string;
  y: number;
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

/**
 * 获取天气
 * @param data
 * @returns
 */
export const weather = (data: any): Promise<ResponseDto<any>> => {
  return axios.post('/grid/api/weather', data);
};

// 首页项目动态列表
export const getProjectDynamicList = (): Promise<ResponseDto<any>> => {
  return axios.get('/api/dashboard/project/list');
};
