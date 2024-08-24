<template>
  <a-menu
    :mode="mode"
    :selected-keys="activeMenu"
    :open-keys="defaultOpenKeys"
    :auto-open-selected="autoOpenSelected"
    :accordion="appStore.menuAccordion"
    :breakpoint="appStore.layout === 'mix' ? 'xl' : undefined"
    :trigger-props="{ animationName: 'slide-dynamic-origin' }"
    :collapsed="!isDesktop ? true : appStore.menuCollapse"
    :style="menuStyle"
    @menu-item-click="onMenuItemClick"
    @sub-menu-click="onSubMenuClick"
    @collapse="onCollapse"
  >
    <MenuItem
      v-for="(item, index) in sidebarRoutes"
      :key="item.name"
      :item="item"
    >
    </MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
  import {
    ref,
    computed,
    defineAsyncComponent,
    watch,
    type CSSProperties,
  } from 'vue';
  import {
    useRoute,
    useRouter,
    type RouteRecordRaw,
    RouteRecordName,
  } from 'vue-router';
  import { toTreeArray } from 'xe-utils';
  import { useAppStore } from '@/store';
  import { useDevice } from '@/hooks/useDevice';

  const MenuItem = defineAsyncComponent(() => import('./menu-item.vue'));

  const defaultOpenKeys = ref<(RouteRecordName | undefined)[]>([]);

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'menu-item-click-after'): void;
  }>();

  interface Props {
    menus?: RouteRecordRaw[];
    menuStyle?: CSSProperties;
  }

  const { isDesktop } = useDevice();
  const route = useRoute();
  const router = useRouter();
  const appStore = useAppStore();
  const sidebarRoutes = computed(() => (props.menus ? props.menus : []));

  // 菜单垂直模式/水平模式
  const mode = computed(() => {
    if (!['left', 'mix'].includes(appStore.layout)) {
      return 'horizontal';
    }
    return 'vertical';
  });

  // 是否默认展开选中的菜单
  const autoOpenSelected = computed(() => {
    if (!['default', 'mix'].includes(appStore.layout)) {
      return false;
    }
    return true;
  });

  // 当前页面激活菜单路径
  const activeMenu = computed(() => {
    return [route.name];
  });
  const getDefaultOpenKeys = () => {
    // const treeArr = toTreeArray(appStore.serverMenu)
    // return route.matched.map((route) => {
    //   const currentRoute = treeArr.find((item) => item.name === route.name)
    //   return currentRoute?.name
    // })
    return [route.matched[1]?.name];
  };

  const onMenuItemClick = (name: string) => {
    const treeArr = toTreeArray(sidebarRoutes.value);
    const obj = treeArr?.find((i) => i.name === name);
    router.push({ name: obj?.name });
    emit('menu-item-click-after');
  };

  const onSubMenuClick = (name: string) => {
    // defaultOpenKeys.value = [name]
    if (defaultOpenKeys.value.indexOf(name) === -1) {
      defaultOpenKeys.value.push(name);
    } else {
      defaultOpenKeys.value.splice(defaultOpenKeys.value.indexOf(name), 1);
    }
  };

  // 折叠状态改变时触发
  const onCollapse = (collapsed: boolean) => {
    if (appStore.layout === 'mix') {
      appStore.menuCollapse = collapsed;
    }
  };

  watch(
    () => route.name,
    () => {
      defaultOpenKeys.value = getDefaultOpenKeys();
      // console.log(defaultOpenKeys.value);
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped></style>
