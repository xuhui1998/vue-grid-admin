<template>
  <a-tooltip ref="tooltipRef" :content="content" :disabled="!isOverflow">
    <template #content>
      <slot name="content" />
    </template>
    <div
      ref="triggerDom"
      class="tooltip-trigger"
      :class="{ 'single-line': lines === 1 }"
    >
      <!-- 默认使用content作为内容和tip,大多数场景下它们都是相同的 -->
      <span
        ><slot>{{ content }}</slot></span
      >
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      content?: string;
      lines?: number; // 超出行数
    }>(),
    { lines: 1 }
  );

  const triggerDom = ref<HTMLDivElement>();
  const isOverflow = ref(false);
  // 使用ResizeObserver API观察尺寸变化
  const observer = new ResizeObserver(() => {
    if (triggerDom.value) {
      // 创建一个选区，等同于鼠标在页面上选择文本
      const range = document.createRange();
      range.setStart(triggerDom.value, 0);
      range.setEnd(triggerDom.value, triggerDom.value.childNodes.length);
      // 获得选区的尺寸
      const rect = range.getBoundingClientRect();
      if (props.lines === 1) {
        // 单行看宽度
        isOverflow.value = rect.width > triggerDom.value.offsetWidth;
      } else {
        // 多行看高度
        isOverflow.value = rect.height > triggerDom.value.offsetHeight;
      }
    }
  });

  onMounted(() => {
    // 观测dom的尺寸变化
    observer.observe(triggerDom.value);
  });

  onUnmounted(() => {
    // 取消所有观测
    observer.disconnect();
  });
</script>

<style scoped lang="less">
  .tooltip-trigger {
    text-overflow: ellipsis;
    overflow: hidden;

    &.single-line {
      white-space: nowrap;
    }

    &:not(.single-line) {
      display: -webkit-box;
      -webkit-line-clamp: v-bind(lines);
      -webkit-box-orient: vertical;
    }
  }
</style>
