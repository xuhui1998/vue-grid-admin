<template>
  <a-watermark
    :content="show ? [watermarkContent as string, dayjs().format('YYYY-MM-DD HH:mm:ss')] : ''"
    :gap="gap"
    :font="fontStyle"
  >
    <slot></slot>
  </a-watermark>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import dayjs from 'dayjs';
  import { useUserStore } from '@/store';

  withDefaults(
    defineProps<{
      gap?: [number, number];
      show?: boolean;
    }>(),
    {
      gap: () => [45, 45],
    }
  );

  const userStore = useUserStore();

  const watermarkContent = computed(() => {
    return userStore.$state.name;
  });

  const fontStyle = ref({
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.05)',
    // color: '#f6f6f6',
  });

  defineOptions({
    name: 'Watermark',
  });
</script>

<style lang="less" scoped></style>
