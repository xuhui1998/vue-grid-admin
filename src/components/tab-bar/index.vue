<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
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
        <div class="tag-bar-operation"></div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, onUnmounted } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import { useAppStore, useTabBarStore } from '@/store';
  import tabItem from './tab-item.vue';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();

  const affixRef = ref();
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });
  console.log(tagList.value);
  const offsetTop = computed(() => {
    return appStore.navbar ? 58 : 0;
  });

  watch(
    () => appStore.navbar,
    () => {
      affixRef.value.updatePosition();
    }
  );
  listenerRouteChange((route: RouteLocationNormalized) => {
    if (!tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
      tabBarStore.updateTabList(route);
    }
  }, true);

  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    height: 36px;
    .tab-bar-box {
      display: flex;
      padding: 5px 8px;
      .tab-bar-scroll {
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          white-space: nowrap;
          overflow-x: auto;
          height: 36px;
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
      width: 100px;
      height: 32px;
    }
  }
</style>
