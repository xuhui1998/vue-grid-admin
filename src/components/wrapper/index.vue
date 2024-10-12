<template>
  <div
    :class="['wrapper', 'layer-bg', 'mb-10', 'omit', className]"
    :style="wrapperStyle"
  >
    <div :class="['wrapper-title', titleClassName]" :style="titleStyle">
      <div v-if="title">
        <span>{{ title }}</span>
      </div>
      <slot name="title"></slot>
    </div>
    <div :class="['wrapper-content', contentClassName]" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { type CSSProperties, ref, watchEffect } from 'vue';

  const props = defineProps<{
    title?: string;
    titleStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    wrapperStyle?: CSSProperties;
    className?: string;
    titleClassName?: string;
    contentClassName?: string;
  }>();

  const slots = defineSlots<{
    title: string;
    default: any;
  }>();

  const titlePadding = ref('0');

  watchEffect(() => {
    if (props.title || slots.title) {
      titlePadding.value = '10px 10px 0 10px';
    }
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
      padding: v-bind(titlePadding);
    }
    &-content {
      padding: 10px;
    }
  }
</style>
