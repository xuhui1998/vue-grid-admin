import type { RouteRecordNormalized } from 'vue-router';

export type Layout = 'left' | 'mix' | 'top';
export interface AppState {
  theme: string;
  colorWeak: boolean;
  navbar: boolean;
  menu: boolean;
  hideMenu: boolean;
  // 菜单收缩
  menuCollapse: boolean;
  footer: boolean;
  // 主体颜色
  themeColor: string;
  // 菜单宽度
  menuWidth: number;
  globalSettings: boolean;
  device: string;
  // 展示多页签
  tabBar: boolean;
  // 展示面包屑
  breadcrumb: boolean;
  // 是否服务端渲染菜单
  menuFromServer: boolean;
  // layout布局是否全屏
  layoutFullscreen: boolean;
  // 全局水印
  watermark?: boolean;
  // 灰色模式
  grey?: boolean;
  // 服务端菜单数据
  serverMenu: RouteRecordNormalized[];
  layout: string;
  transitionName: string;
  [key: string]: unknown;
}
