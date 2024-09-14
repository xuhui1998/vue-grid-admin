<template>
  <div class="layout-mix transition-all-300">
    <section
      :class="[
        'layout-mix-left',
        'transition-all-300',
        { 'layout-mix-left-hide': appStore.layoutFullscreen },
      ]"
      :style="{
        width: !appStore.menuCollapse ? `${appStore.menuWidth}px` : '48px',
      }"
    >
      <Logo></Logo>
      <LeftMenu
        :menus="leftMenus"
        :menu-style="{ width: `${appStore.menuWidth}px`, flex: 1 }"
      ></LeftMenu>
      <Version />
    </section>
    <!-- <MobileLeftMenu v-if="!isDesktop" /> -->

    <section class="layout-mix-right">
      <header
        :class="[
          'layout-navbar',
          'flex',
          'flex-row-center',
          'transition-all-300',
          { 'tab-navbar': appStore.tabBar },
          { 'layout-navbar-hide': appStore.layoutFullscreen },
        ]"
      >
        <div class="collapse grid-btn ml-10" @click="toggleDrawerMenu">
          <div
            :style="{
              transform: appStore.menuCollapse ? 'rotate(180deg)' : '',
            }"
          >
            <icon-menu-fold :size="18" />
          </div>
        </div>
        <a-menu
          mode="horizontal"
          class="grid-top-menu"
          :selected-keys="activeMenu"
          :auto-open-selected="false"
          :trigger-props="{ animationName: 'slide-dynamic-origin' }"
          @menu-item-click="onMenuItemClick"
        >
          <a-menu-item v-for="item in topMenus" :key="item.name">
            <span>{{
              item.meta?.locale || item.children?.[0]?.meta?.locale || ''
            }}</span>
          </a-menu-item>
        </a-menu>
        <NavBar />
      </header>
      <a-layout class="layout-content transition-all-300">
        <TabBar v-if="appStore.tabBar" />
        <a-layout-content>
          <PageLayout />
        </a-layout-content>
      </a-layout>
    </section>
  </div>
</template>

<script setup lang="ts">
  import {
    ref,
    watch,
    nextTick,
    onMounted,
    provide,
    defineAsyncComponent,
  } from 'vue';
  import {
    useRoute,
    useRouter,
    type RouteRecordRaw,
    RouteRecordName,
  } from 'vue-router';
  import { searchTree } from 'xe-utils';
  import MyStorage from '@/utils/storage';
  import { filterTree } from '@/utils';
  import { useAppStore } from '@/store';
  import { useDevice } from '@/hooks/useDevice';
  import NavBar from '@/components/navbar/index.vue';
  import Logo from './components/logo.vue';
  import LeftMenu from './components/left-menu.vue';

  const PageLayout = defineAsyncComponent(() => import('./page-layout.vue'));
  const Version = defineAsyncComponent(
    () => import('./components/version.vue')
  );
  const TabBar = defineAsyncComponent(
    () => import('@/components/tab-bar/index.vue')
  );
  const MobileLeftMenu = defineAsyncComponent(
    () => import('./components/mobile-left-menu.vue')
  );

  const route = useRoute();
  const router = useRouter();
  const appStore = useAppStore();
  const storage = new MyStorage();
  const { isDesktop } = useDevice();

  const subscriptCount = ref<number>(1);
  /**
   * 顶部一级菜单选中的菜单
   */
  const activeMenu = ref<(RouteRecordName | undefined)[]>();
  const leftMenus = ref<RouteRecordRaw[]>([]);
  // 过滤是菜单的路由
  const menuRoutes = filterTree(
    appStore.serverMenu,
    (i) => i.meta?.hideInMenu === false
  );

  const cloneMenuRoutes: RouteRecordRaw[] = JSON.parse(
    JSON.stringify(menuRoutes)
  );

  // 顶部一级菜单
  const topMenus = ref<RouteRecordRaw[]>([]);
  topMenus.value = JSON.parse(JSON.stringify(menuRoutes));

  const toggleDrawerMenu = () => {
    appStore.updateSettings({ menuCollapse: !appStore.menuCollapse });
  };
  provide('toggleDrawerMenu', toggleDrawerMenu);

  const getFirstMenu = (menu: RouteRecordRaw[]) => {
    const firstRoute = menu[0];
    if (firstRoute.children) {
      return firstRoute.children[0].name;
    }
    return firstRoute.name;
  };

  /**
   * 获取左侧菜单
   */
  function getLeftMenus(name: RouteRecordName | undefined) {
    const arr = searchTree(cloneMenuRoutes, (i) => i.name === name, {
      children: 'children',
    });
    const rootName = arr.length ? arr[0].name : '';
    const obj = cloneMenuRoutes.find((i) => i.name === rootName);
    activeMenu.value = obj ? [obj.name] : [''];
    leftMenus.value = obj ? (obj.children as RouteRecordRaw[]) : [];
  }

  const onMenuItemClick = (name: string) => {
    const obj = topMenus.value.find((i) => i.name === name);
    getLeftMenus(obj?.name);

    if (leftMenus.value) {
      const firstMenuName = getFirstMenu(leftMenus.value);
      router.push({ name: firstMenuName });
    } else {
      router.push({ name: 'Workplace' });
      activeMenu.value = ['Dashboard'];
    }
  };
  /**
   * 系统更新日志
   */
  const viewUpdateLog = () => {
    subscriptCount.value = 0;
    storage.setStorage('version', appStore.version);
  };

  watch(
    () => route.name,
    (newName) => {
      nextTick(() => {
        getLeftMenus(newName as string);
      });
    },
    { immediate: true }
  );

  onMounted(() => {
    const appVersion = storage.getStorage('version');
    if (appVersion && appVersion == appStore.version) {
      subscriptCount.value = 0;
    }
  });
</script>

<style lang="less" scoped>
  @import url('@/assets/style/grid-design.less');

  :deep(.arco-menu-pop) {
    white-space: nowrap;
  }

  :deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
    // Menu菜单组件修改
    .arco-menu-icon {
      margin-right: 0;
      padding: 10px 0;
    }

    .arco-menu-has-icon {
      padding: 0;
      justify-content: center;
    }

    .arco-menu-title {
      display: none;
    }
  }

  :deep(.arco-menu-horizontal) {
    flex: 1;
    overflow: hidden;

    .arco-menu-inner {
      padding-left: 0;

      .arco-menu-overflow-wrap {
        white-space: nowrap;
      }
    }
  }

  .layout-mix {
    height: 100vh;
    display: flex;
    align-items: stretch;
    overflow: hidden;

    &-left {
      box-shadow: @layout-shadow;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }
    &-left-hide {
      width: 0 !important;
      overflow: hidden;
    }

    &-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }

    &:before {
      width: 100%;
      height: 100vh;
      background: url('@/assets/images/navbar-bg.jpg') no-repeat top,
        linear-gradient(8deg, #f5f5f5 64%, #7da7f5c7);
      opacity: 0.8;
      bottom: 0;
      content: '';
      display: block;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: -2;
    }
  }

  .layout-navbar {
    height: @navbar-height;
    color: var(--color-text-1);
    // background: var(--color-bg-1);
    // border-bottom: 1px solid var(--color-border);
    box-shadow: @layout-shadow;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    .collapse {
      width: 20px;
      height: 20px;
    }
  }
  .layout-navbar-hide {
    height: 0;
    overflow: hidden;
  }
  .tab-navbar {
    border-bottom: 1px solid #dee2e6;
    box-shadow: 0 1px 2px rgba(0, 21, 41, 1);
    box-shadow: none;
  }
  .layout-content {
    min-height: calc(100vh - 60px);
    overflow-y: auto;
  }
  .arco-menu-selected,
  .arco-menu-item {
    &:hover {
      background-color: transparent !important;
    }
  }
  :deep(.arco-menu-selected-label) {
    bottom: -2px;
  }
  .arco-menu-item {
    position: relative;
    font-weight: bold;
    &:hover span::after {
      left: 0;
      right: 0;
    }
    // &:hover {
    //   color: rgb(var(--primary-6));
    // }
    span {
      position: relative;
      display: block;
    }
    span::after {
      content: ' ';
      position: absolute;
      height: 3px;
      background: rgb(var(--primary-6));
      bottom: -2px;
      left: 50%;
      right: 50%;
      transition: all 300ms ease;
    }
  }
</style>
