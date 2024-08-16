<template>
  <div class="container">
    <!-- <Breadcrumb :items="breadcrumb" /> -->
    <slot name="back">
      <div class="back"></div>
    </slot>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <a-card v-if="props.statistic" class="statistic">
      <slot name="statistic"></slot>
    </a-card>
    <slot name="form"></slot>
    <slot name="buttons"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useAppStore } from '@/store';
  import { useRoute } from 'vue-router';
  import { toTreeArray } from 'xe-utils';

  const appStore = useAppStore();
  const route = useRoute();
  const treeArr = toTreeArray(appStore.serverMenu)

  const breadcrumb = computed(() => {
    return route.matched.map((route) => {
      const currentRoute = treeArr.find((item) => item.name === route.name)
      return currentRoute?.meta?.locale
    })
  })

  type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';
  const size = ref<SpaceSize>('medium');
  const props = defineProps({
    breadcrumb: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    statistic: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 8px;
    position: relative;
  }
  .arco-space {
    margin-bottom: 10px;
  }
  .arco-card {
    border: none;
    :deep(.arco-card-header) {
      border: none;
    }
  }
  // .statistic {
  //   padding-bottom: 10px;
  // }
</style>
