<template>
  <div
    :class="[
      'tab-bar-container',
      { 'layout-left': appStore.layout === 'left' },
    ]"
  >
    <div class="tab-bar-box">
      <div class="tab-bar-scroll">
        <div class="tags-wrap">
          <tab-item
            v-for="(tag, index) in tagList"
            :key="tag.fullPath"
            :index="index"
            :item-data="tag"
          />
        </div>
      </div>
      <div class="tag-bar-operation">
        <a-space>
          <a-tooltip content="重新加载" position="bottom">
            <div class="grid-btn" @click="reload">
              <IconRefresh />
            </div>
          </a-tooltip>
          <a-tooltip
            :content="appStore.layoutFullscreen ? '退出全屏' : '全屏'"
            position="br"
          >
            <div
              class="grid-btn"
              @click="
                appStore.updateSettings({
                  layoutFullscreen: !appStore.layoutFullscreen,
                })
              "
            >
              <IconFullscreen v-if="!appStore.layoutFullscreen" />
              <IconFullscreenExit v-else />
            </div>
          </a-tooltip>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onUnmounted } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { useRouter, useRoute } from 'vue-router';
  import { REDIRECT_ROUTE_NAME } from '@/router/constants';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import { useAppStore, useTabBarStore } from '@/store';
  import tabItem from './tab-item.vue';

  const appStore = useAppStore();
  const router = useRouter();
  const route = useRoute();
  const tabBarStore = useTabBarStore();

  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  listenerRouteChange((curRoute: RouteLocationNormalized) => {
    if (!tagList.value.some((tag) => tag.fullPath === curRoute.fullPath)) {
      tabBarStore.updateTabList(curRoute);
    }
  }, true);

  const reload = () => {
    router.push({
      name: REDIRECT_ROUTE_NAME,
      params: {
        path: route.fullPath,
      },
    });
  };

  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style scoped lang="less">
  @import url('@/assets/style/grid-design.less');

  .tab-bar-container {
    position: relative;
    box-shadow: @tab-shadow;
    z-index: 1;
    .tab-bar-box {
      display: flex;
      padding: 4px 12px;
      .tab-bar-scroll {
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          white-space: nowrap;
          overflow-x: auto;
          height: 34px;
          gap: 5px;
          display: flex;
          align-items: center;

          :deep(.arco-tag) {
            display: inline-flex;
            align-items: center;
            margin-right: 6px;
            cursor: pointer;
            &:first-child {
              .arco-tag-close-btn {
                display: none;
              }
            }
          }
        }
      }
    }

    .tag-bar-operation {
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .layout-left {
    box-shadow: @layout-default-tab-shadow;
  }
</style>
