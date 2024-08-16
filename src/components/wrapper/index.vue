<template>
  <div :class="['wrapper', 'mb-10', className]" :style="wrapperStyle">
    <div :class="['wrapper-title', titleClassName]" :style="titleStyle">
      <div>{{ title }}</div>
      <slot name="title"></slot>
    </div>
    <div :class="['wrapper-content', contentClassName]" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script lang='ts' setup>
  import { type CSSProperties } from 'vue';

  defineProps<{
    title?: string;
    titleStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    wrapperStyle?: CSSProperties;
    className?: string;
    titleClassName?: string;
    contentClassName?: string;
  }>();
</script>
<style lang='less' scoped>
  .wrapper {
    // background-color: var(--color-bg-2);
    position: relative;
    background-color: var(--color-spin-layer-bg);
    border-radius: 8px;
    &-title {
      align-items: center;
      color: var(--color-text-1);
      font-size: 14px;
      font-weight: bold;
      line-height: 1.5715;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 10px 10px 0 10px;
    }
    &-content {
      padding: 10px;
    }
  }
</style>