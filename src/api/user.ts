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

export function getUserInfo() {
  return axios.post('/grid/auth/user');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/grid/system/adminMenuList');
}