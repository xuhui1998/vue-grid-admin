import Clipboard from 'clipboard';
import dayjs from 'dayjs';
import { Message, TableData } from '@arco-design/web-vue';
import { mapTree } from 'xe-utils';
import Qs from 'qs';
import { getToken } from './auth';

type TargetContext = '_self' | '_parent' | '_blank' | '_top';
const Layout = () => import('@/layout/index.vue');

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

export const jsonToFormData = (obj: any) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key: string): void => {
    formData.append(key, obj[key]);
  });
  return formData;
};

// 导出excel数据
export const downloadExcel = (formModel: any, url: string) => {
  formModel.token = getToken();
  const queryStr = Qs.stringify(formModel);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  window.open(`${baseUrl}${url}?${queryStr}`, '_blank');
  Message.success('导出成功');
};

export const myClipboard = (url: string) => {
  const clipboard = new Clipboard('.copy-button', {
    text: () => url,
  });
  clipboard.on('success', () => {
    Message.success({
      content: '复制成功',
      duration: 2 * 1000,
    });
  });
  clipboard.on('error', () => {
    Message.error({
      content: '复制失败',
      duration: 2 * 1000,
    });
  });
  clipboard.onClick(event);
};

// 替换接口返回的数组为标准数组
export const getStandardArr = (arr: any) => {
  if (!arr) return [];
  return Object.keys(arr).map((key) => arr[key]);
};

export const filterASyncRoutes = (data: any) => {
  const routes = data.filter((item: any) => {
    if (item.component === 'Layout') item.component = Layout;
    else item.component = () => import(`@/view/${item.component}/index.vue`);
    // 路由递归，转换组件对象和路径
    if (item.children && item.children.length > 0)
      item.children = filterASyncRoutes(item.children);
    return true;
  });
  return routes;
};

/**
 * 大屏自定义排序方法
 * @param
 */
export const customColumnsSorter = (
  a: TableData,
  b: TableData,
  extra: { dataIndex: string; direction: 'ascend' | 'descend' }
) => {
  if (extra.direction === 'ascend') {
    if (typeof a[extra.dataIndex] === 'string') {
      return (
        Number(a[extra.dataIndex].replace(',', '')) -
        Number(b[extra.dataIndex].replace(',', ''))
      );
    }
    return a[extra.dataIndex] - b[extra.dataIndex];
  }
  if (extra.direction === 'descend') {
    if (typeof a[extra.dataIndex] === 'string') {
      return (
        Number(b[extra.dataIndex].replace(',', '')) -
        Number(a[extra.dataIndex].replace(',', ''))
      );
    }
    return b[extra.dataIndex] - a[extra.dataIndex];
  }
};

/**
 * 随机标签颜色
 * @returns
 */
export const getRandomTagColor = () => {
  const colorArr = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
  ];
  const randomNum = Math.floor(Math.random() * 13) + 1;
  return colorArr[randomNum];
};

/**
 * 根据时间戳返回标准时间
 * @param timeStamp 时间戳
 * @returns 、
 */
export const getStandardFormatTime = (
  timeStamp: string | number,
  timeType = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!timeStamp) return '-';
  if (typeof timeStamp === 'string') {
    timeStamp = Number(timeStamp);
  }
  return timeStamp > 0 ? dayjs.unix(timeStamp).format(timeType) : '-';
};

/**
 * @desc 过滤树
 * @param { values } 数组
 */
type FilterTree = <T extends { children?: T[] }>(
  array: T[],
  iterate: (item: T, index?: number, items?: T[]) => boolean
) => T[];
export const filterTree: FilterTree = (values, fn) => {
  const arr = values.filter(fn);
  const data = mapTree(arr, (item) => {
    if (item.children && item.children.length) {
      item.children = item.children.filter(fn);
    }
    return item;
  });
  return data;
};

/**
 * 获取url参数
 * @returns
 */
export const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  return params;
};

/**
 * 获取图标类型
 */
export const getIconType = (icon: string | undefined) => {
  if (!icon) return '';
  if (icon.substring(0, 4).toLowerCase() === 'icon') {
    return 'arco-icon';
  }
  return 'iconfont';
};

export default null;
