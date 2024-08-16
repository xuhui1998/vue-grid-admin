import { computed, ref } from 'vue';
import { useRouter, RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import usePermission from '@/hooks/permission';
import { useAppStore, useUserStore } from '@/store';
import { useStorage } from '@vueuse/core';
import appClientMenus from '@/router/app-menus';
import { cloneDeep } from 'lodash';

const userStore = useUserStore();
const router = useRouter();

/**
 * 按userId过滤菜单
 * @param routes 路由配置列表
 * @returns
 */
const filterRoutersConfig = (
  routes: RouteRecordNormalized[],
  userIds: string[]
) => {
  const result: any[] = [];
  if (!userIds.includes(userStore.$state.id as string)) {
    routes.forEach((route) => {
      const newRoute = { ...route };
      if (newRoute.children) {
        newRoute.children = newRoute.children.filter(
          (childRoute) => childRoute.name !== 'EpisodeSet'
        );
      }
      result.push(newRoute);
    });
    return result;
  }
  return routes;
};

export default function useMenuTree() {
  const permission = usePermission();
  const appStore = useAppStore();
  // const appRoute = ref(
  //   appStore.menuFromServer ? appStore.appAsyncMenus : appClientMenus
  // );
  const appRoute = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.appAsyncMenus;
    }
    return appClientMenus;
  });
  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[];
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0);
    });
    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) return null;

      const collector: any = _routes.map((element) => {
        // no access
        if (!permission.accessRouter(element)) {
          return null;
        }

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = [];
          return element;
        }

        // route filter hideInMenu true
        element.children = element.children.filter(
          (x) => x.meta?.hideInMenu !== true
        );

        // Associated child node
        const subItem = travel(element.children, layer + 1);

        if (subItem.length) {
          element.children = subItem;
          return element;
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem;
          return element;
        }

        if (element.meta?.hideInMenu === false) {
          return element;
        }

        return null;
      });
      return collector.filter(Boolean);
    }
    return travel(copyRouter, 0);
  });

  return {
    menuTree,
  };
}
