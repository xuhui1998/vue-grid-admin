<template>
  <LayoutMix v-if="appStore.layout === 'mix'"></LayoutMix>
  <LayoutDefault v-else></LayoutDefault>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/store';
  import LayoutDefault from './default-layout.vue';
  import LayoutMix from './layout-mix.vue';

  defineOptions({ name: 'Layout' });
  const appStore = useAppStore();
</script>

<style lang="less" scoped></style>
