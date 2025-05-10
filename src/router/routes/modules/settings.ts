/*
 * @Author: mizao 1253767373@qq.com
 * @Date: 2024-08-15 15:58:40
 * @LastEditors: mizao 1253767373@qq.com
 * @LastEditTime: 2025-04-12 11:03:16
 * @FilePath: /vue-grid-admin/src/router/routes/modules/settings.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SETTINGS: AppRouteRecordRaw = {
  path: '/settings',
  name: 'Settings',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '系统',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 2,
  },
  children: [
    {
      path: 'menu',
      name: 'MenuManagement',
      component: () => import('@/views/settings/menu/index.vue'),
      meta: {
        locale: '菜单管理',
        requiresAuth: true,
      },
    },
    {
      path: 'admin',
      name: 'Admin',
      component: () => import('@/views/settings/admin/index.vue'),
      meta: {
        locale: '人员管理',
        requiresAuth: true,
      },
    },
  ],
};

export default SETTINGS;
