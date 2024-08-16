<template>
  <div class="layout-mix">
    <section class="layout-mix-left">
      <Logo></Logo>
      <LeftMenu :menus="leftMenus" :menu-style="{ width: `${appStore.menuWidth}px`, flex: 1 }"></LeftMenu>
        <div class="version" @click="viewUpdateLog">
          <a-badge :count="subscriptCount" dot :offset="[5, -2]">v.{{appStore.version}}</a-badge>
        </div>
    </section>
    <!-- <MobileLeftMenu v-if="!isDesktop" /> -->

    <section class="layout-mix-right">
      <header class="header flex flex-row-center">
        <div class="collapse">
          <div
            @click="toggleDrawerMenu"
            :style="{ transform: appStore.menuCollapse ? 'rotate(180deg)' : '' }"
          >
            <icon-menu-fold />
          </div>
        </div>
        <a-menu mode="horizontal" :selected-keys="activeMenu" :auto-open-selected="false"
          :trigger-props="{ animationName: 'slide-dynamic-origin' }" @menu-item-click="onMenuItemClick">
          <a-menu-item v-for="item in topMenus" :key="item.name">
            <span>{{ item.meta?.locale || item.children?.[0]?.meta?.locale || '' }}</span>
          </a-menu-item>
        </a-menu>
        <NavBar />
      </header>
      <a-layout class="layout-content">
        <a-layout-content>
          <PageLayout />
        </a-layout-content>
      </a-layout>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, onMounted, defineAsyncComponent } from 'vue'
  import { useRoute, useRouter, type RouteRecordRaw, RouteRecordName } from 'vue-router'
  import { searchTree } from 'xe-utils'
  import LeftMenu from './components/left-menu.vue'
  import Logo from './components/logo.vue'
  import NavBar from './components/navbar.vue';
  import MyStorage from '@/utils/storage'
  import { openWindow } from '@/utils'
  import { useAppStore } from '@/store'
  import { filterTree } from '@/utils'
  import { useDevice } from '@/hooks/useDevice'

  const PageLayout = defineAsyncComponent(() => import('./page-layout.vue'));
  const MobileLeftMenu = defineAsyncComponent(() => import('./components/mobile-left-menu.vue'));

  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()
  const storage = new MyStorage()
  const { isDesktop } = useDevice()

  const subscriptCount = ref<number>(1);
  // 过滤是菜单的路由
  const menuRoutes = filterTree(appStore.serverMenu, (i) => i.meta?.hideInMenu === false)

  // 顶部一级菜单
  const topMenus = ref<RouteRecordRaw[]>([])
  topMenus.value = JSON.parse(JSON.stringify(menuRoutes))

  // const getMenuIcon = (item: RouteRecordRaw, key: 'svgIcon' | 'icon') => {
  //   return item.meta?.[key] || item.children?.[0].meta?.[key]
  // }

  const toggleDrawerMenu = () => {
    appStore.collapseMenu()
  };

  const getFirstMenu = (menu: RouteRecordRaw[]) => {
    const firstRoute = menu[0];
    if (firstRoute.children) {
      return firstRoute.children[0].name;
    }
    return firstRoute.name;
  };

  const onMenuItemClick = (name: string) => {
    const obj = topMenus.value.find((i) => i.name === name)
    getLeftMenus(obj?.name)
    
    if (leftMenus.value) {
      const firstMenuName = getFirstMenu(leftMenus.value);
      router.push({ name: firstMenuName })
    } else {
      router.push({ name: 'Workplace' })
      activeMenu.value = ['Dashboard']
    }
  }

  const cloneMenuRoutes: RouteRecordRaw[] = JSON.parse(JSON.stringify(menuRoutes))
  /**
   * 顶部一级菜单选中的菜单
   */
  const activeMenu = ref<(RouteRecordName | undefined)[]>()
  const leftMenus = ref<RouteRecordRaw[]>([])
  /**
   * 获取左侧菜单
   */
  function getLeftMenus(name: RouteRecordName | undefined) {
    const arr = searchTree(cloneMenuRoutes, (i) => i.name === name, { children: 'children' })
    const rootName = arr.length ? arr[0].name : ''
    const obj = cloneMenuRoutes.find((i) => i.name === rootName)
    activeMenu.value = obj ? [obj.name] : ['']
    leftMenus.value = obj ? (obj.children as RouteRecordRaw[]) : []
  }

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
        getLeftMenus(newName as string)
      })
    },
    { immediate: true }
  )

  onMounted(() => {
    const appVersion = storage.getStorage('version')
    if (appVersion && appVersion == appStore.version) {
      subscriptCount.value = 0
    }
  })
</script>

<style lang="less" scoped>
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
    // border-right: 1px solid var(--color-border);
    box-shadow: 0px 0 8px rgb(0 21 41 / 11%);
    // background-color: var(--color-bg-1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    .version {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--color-text-3);
      font-size: 12px;
      cursor: pointer;
      &:hover {
        // color: var(--color-text-2);
        color: rgb(var(--primary-6));
      }
    }
  }

  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  &:before{
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/navbar-bg.jpg') no-repeat top,linear-gradient(8deg, #f5f5f5 64%, #7da7f5c7);
    opacity: .8;
    bottom: 0;
    content: "";
    display: block;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: -2;
  }
}

.header {
  padding: 0;
  color: var(--color-text-1);
  // background: var(--color-bg-1);
  // border-bottom: 1px solid var(--color-border);
  box-shadow: 0px 0 8px rgb(0 21 41 / 11%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  .collapse {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    // background-color: var(--color-menu-light-bg);
    > div {
      margin-left: 16px;
      color: var(--color-text-3);
      // background-color: var(--color-fill-1);
      background-color: rgba(255, 255, 255, 0.33);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: var(--border-radius-small);
      cursor: pointer;
    }
  }
}
.layout-content {
  min-height: calc(100vh - 60px);
  overflow-y: auto;
  // background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
.arco-menu-selected, .arco-menu-item  {
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
