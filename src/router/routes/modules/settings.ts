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
  ],
};

export default SETTINGS;
