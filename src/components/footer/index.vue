<template>
  <a-layout-footer
    :class="[
      'footer',
      'transition-all-300',
      { 'footer-hide': !appStore.footer || appStore.layoutFullscreen },
    ]"
  >
    {{ appStore.projectName }}@{{ appStore.version }}
  </a-layout-footer>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/store';

  const appStore = useAppStore();
</script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: var(--color-text-2);
    text-align: center;
  }
  .footer-hide {
    height: 0;
    overflow: hidden;
  }
</style>
