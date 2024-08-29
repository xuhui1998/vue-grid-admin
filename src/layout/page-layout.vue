<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="(appStore.transitionName as string)"
      mode="out-in"
      appear
    >
      <component
        :is="Component"
        v-if="route.meta.ignoreCache"
        :key="route.fullPath"
      />
      <keep-alive v-else :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useTabBarStore, useAppStore } from '@/store';

  const tabBarStore = useTabBarStore();
  const appStore = useAppStore();

  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
