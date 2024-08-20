<template>
  <a-col class="banner layer-bg">
    <a-col :span="8">
      <a-typography-title :heading="5" style="margin-top: 0">
        {{ $t('workplace.welcome') }} {{ userInfo.name }}
      </a-typography-title>
    </a-col>
  </a-col>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useUserStore } from '@/store';

  const userStore = useUserStore();
  const userInfo = computed(() => {
    return {
      name: userStore.name,
    };
  });
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 16px;
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }

  .arco-typography {
    margin: 0;
  }
</style>
