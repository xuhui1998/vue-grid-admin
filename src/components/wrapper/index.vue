<template>
  <div
    :class="['wrapper', 'layer-bg', 'mb-10', className]"
    :style="wrapperStyle"
  >
    <div :class="['wrapper-title', titleClassName]" :style="titleStyle">
      <div>{{ title }}</div>
      <slot name="title"></slot>
    </div>
    <div :class="['wrapper-content', contentClassName]" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { type CSSProperties, computed } from 'vue';

  const props = defineProps<{
    title?: string;
    titleStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    wrapperStyle?: CSSProperties;
    className?: string;
    titleClassName?: string;
    contentClassName?: string;
  }>();

  const titlePadding = computed(() => {
    if (props.title) {
      return '10px 10px 0 10px';
    }
    return '0';
  });
</script>

<style lang="less" scoped>
  .wrapper {
    position: relative;
    border-radius: 8px;
    &-title {
      align-items: center;
      color: var(--color-text-1);
      font-size: 16px;
      font-weight: bold;
      line-height: 1.5715;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: v-bind(titlePadding);
    }
    &-content {
      padding: 10px;
    }
  }
</style>
