<template>
  <a-grid>
    <a-grid-item :span="8" class="flex-center">
      <a-tooltip content="左侧菜单布局">
        <div
          :class="[
            'left-menu-layout',
            'flex',
            'layout-btn',
            { active: currentLayout === 'left' },
          ]"
          @click="changeLayout('left')"
        >
          <div class="menu"></div>
          <div class="main"></div>
        </div>
      </a-tooltip>
    </a-grid-item>
    <a-grid-item :span="8" class="flex-center">
      <a-tooltip content="顶部菜单布局">
        <div
          :class="[
            'top-menu-layout',
            'layout-btn',
            'flex-column',
            { active: currentLayout === 'top' },
          ]"
          @click="changeLayout('top')"
        >
          <div class="menu"></div>
          <div class="main"></div>
        </div>
      </a-tooltip>
    </a-grid-item>
    <a-grid-item :span="8" class="flex-center">
      <a-tooltip content="混合菜单布局">
        <div
          :class="[
            'mix-menu-layout',
            'layout-btn',
            'flex',
            { active: currentLayout === 'mix' },
          ]"
          @click="changeLayout('mix')"
        >
          <div class="menu left-menu"></div>
          <div class="mix-right flex-column flex-1">
            <div class="menu top-menu"></div>
            <div class="main"></div>
          </div>
        </div>
      </a-tooltip>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useAppStore } from '@/store';

  type LayoutType = 'left' | 'top' | 'mix';

  const appStore = useAppStore();

  const currentLayout = ref(appStore.layout);
  const changeLayout = (layout: LayoutType) => {
    currentLayout.value = layout;
    appStore.updateSettings({ layout });
  };
</script>

<style lang="less" scoped>
  @import url('@/assets/style/index.less');

  .layout-btn {
    padding: 6px;
    gap: 6px;
    width: 80px;
    height: 60px;
    cursor: pointer;
    border: 1px solid var(--grid-default-bg-color);
    border-radius: 4px;
    box-shadow: @layout-shadow;
    &.active {
      border-color: var(--grid-primary-bg-color);
    }
    &:hover {
      border-color: var(--grid-primary-bg-color);
    }
    .menu {
      background-color: var(--grid-primary-bg-color-5);
      border-radius: 4px;
    }
    .main {
      flex: 1;
      background-color: var(--grid-primary-bg-color-3);
      border-radius: 4px;
    }
  }
  .left-menu-layout .menu {
    width: 15px;
  }
  .top-menu-layout .menu {
    height: 15px;
  }
  .mix-menu-layout {
    .left-menu {
      width: 15px;
    }
    .top-menu {
      height: 15px;
    }
    .mix-right {
      gap: 6px;
    }
  }
</style>
