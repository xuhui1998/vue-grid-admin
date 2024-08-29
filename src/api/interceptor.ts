import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { getToken, setToken, clearToken } from '@/utils/auth';
import ResponseDto from '@/dto/responseDto';

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.timeout = 1000 * 20;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

let status = true;
axios.interceptors.response.use(
  (response: AxiosResponse<ResponseDto<any>, any>) => {
    if (response.headers.authorization) {
      setToken(response.headers.authorization);
    }
    if (response.headers['content-type'] === 'image/png') {
      return response;
    }
    const { data } = response;
    if (data.code === 200) {
      return data;
    }
    if (data.code === 401 || data.code === 402) {
      if (status) {
        // Message.warning({
        //   content: data.message || '登录已过期，请重新登录',
        //   duration: 3 * 1000,
        // });
        Modal.error({
          title: '系统提示',
          content: data.message,
          modalStyle: { textAlign: 'center' },
          escToClose: false,
          maskClosable: false,
          okText: '确认',
          async onOk() {
            clearToken();
            window.location.href = '/login';
          },
        });
      }
      status = false;
      const timeout = setTimeout(() => {
        status = true;
        clearTimeout(timeout);
      }, 1500);
    } else if (data.code === 404 || data.code === 400) {
      Message.error({
        content: data.message || '系统错误',
        duration: 3 * 1000,
      });
      return data;
    } else {
      Message.error({
        content: data.message || '系统错误',
        duration: 3 * 1000,
      });
      return Promise.reject(new Error(data.message || 'Error'));
    }
    return data;
  },
  (error) => {
    Message.error({
      content: error.message || 'Request Error',
      duration: 5 * 1000,
    });
    // return Promise.reject(error);
    return error;
  }
);
