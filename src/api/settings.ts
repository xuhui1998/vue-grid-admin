import axios from 'axios';
import ResponseDto from '@/dto/responseDto';

/**
 * 新增人员
 * @param data
 * @returns
 */
export const addAdmin = (data: any): Promise<ResponseDto<any>> => {
  return axios.post('/grid/auth/register', data);
};

/**
 * 非配权限菜单列表
 * @param data
 * @returns
 */
export const menuListAll = (): Promise<ResponseDto<any>> => {
  return axios.post('/grid/settings/menuListAll');
};

/**
 * 添加菜单
 * @param data
 * @returns
 */
export const saveMenu = (data: any): Promise<ResponseDto<any>> => {
  return axios.post('/grid/settings/saveMenu', data);
};

/**
 * 菜单详情
 * @param data
 * @returns
 */
export const menuDetail = (data: any): Promise<ResponseDto<any>> => {
  return axios.post('/grid/settings/menuDetail', data);
};

/**
 * 删除菜单
 * @param data
 * @returns
 */
export const delMenu = (data: any): Promise<ResponseDto<any>> => {
  return axios.post('/dc/settings/delMenu', data);
};



