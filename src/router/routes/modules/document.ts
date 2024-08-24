import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DOCUMENT: AppRouteRecordRaw = {
  path: '/document',
  name: 'Document',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '文档',
    requiresAuth: true,
  },
  children: [
    {
      path: 'vue-doc',
      name: 'VueDocument',
      component: () => import('@/views/document/vueDoc/index.vue'),
      meta: {
        locale: 'Vue文档',
        requiresAuth: true,
      },
    },
    {
      path: 'vite-doc',
      name: 'ViteDocument',
      component: () => import('@/views/document/viteDoc/index.vue'),
      meta: {
        locale: 'Vite文档',
        requiresAuth: true,
      },
    },
    {
      path: 'arco-doc',
      name: 'ArcoDocument',
      component: () => import('@/views/document/arcoDoc/index.vue'),
      meta: {
        locale: 'Vite文档',
        requiresAuth: true,
      },
    },
  ],
};

export default DOCUMENT;
