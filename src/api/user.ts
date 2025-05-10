/*
 * @Author: mizao 1253767373@qq.com
 * @Date: 2025-01-13 15:11:45
 * @LastEditors: mizao 1253767373@qq.com
 * @LastEditTime: 2025-03-26 15:14:04
 * @FilePath: /vue-grid-admin/src/api/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import Qs from 'qs';
import LoginDto from '@/dto/loginDto';
import LoginResultDto from '@/dto/loginResultDto';
import ResponseDto from '@/dto/responseDto';

export function login(data: LoginDto) {
  return axios.post<LoginResultDto>('/grid/auth/login', Qs.stringify(data));
}

export function logout() {
  return axios.post<LoginDto>('/grid/auth/logout');
}

export function getUserInfo(): Promise<ResponseDto<any>> {
  return axios.post('/grid/auth/user');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/grid/system/adminMenuList');
}
