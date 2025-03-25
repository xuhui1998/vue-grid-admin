import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const COMPONENTS: AppRouteRecordRaw = {
  path: '/components',
  name: 'Components',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '组件',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 1,
  },
  children: [
    {
      path: 'color-picker',
      name: 'ColorPicker',
      component: () => import('@/views/components/color-picker/index.vue'),
      meta: {
        locale: '菜单管理',
        requiresAuth: true,
      },
    },
  ],
};

export default COMPONENTS;
