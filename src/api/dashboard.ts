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

/**
 * 首页项目动态列表
 * @returns
 */
export const getProjectDynamicList = (): Promise<ResponseDto<any>> => {
  return axios.get('/api/dashboard/project/list');
};

/**
 * 项目更新记录
 * @returns
 */
export const getProjectUpdateList = (): Promise<ResponseDto<any>> => {
  return axios.get('/api/dashboard/update/list');
};

/**
 * 分析页数据总览
 * @returns
 */
export const getOverviewData = (): Promise<ResponseDto<any>> => {
  return axios.get('/api/dashboard/analysis/data');
};

/**
 * 分析页数据趋势
 * @returns
 */
export const trendChartData = (): Promise<ResponseDto<any>> => {
  return axios.get('/api/dashboard/analysis/chart');
};

/**
 * 分析页访问量数据
 * @returns
 */
export const visitChartData = (): Promise<ResponseDto<any>> => {
  return axios.get('/api/dashboard/analysis/visitChart');
};

/**
 * 分析页下载量数据
 * @returns
 */
export const downloadChartData = (): Promise<ResponseDto<any>> => {
  return axios.get('/api/dashboard/analysis/downloadChart');
};
