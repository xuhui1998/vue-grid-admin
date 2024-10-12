<template>
  <div v-if="!menuCollapse" class="version" @click="viewUpdateLog">
    <a-badge :count="subscriptCount" dot :offset="[5, -2]"
      >v.{{ appStore.version }}</a-badge
    >
  </div>
  <a-popover v-else position="right">
    <div class="version-icon">
      <IconInfoCircle />
    </div>
    <template #content>
      <div class="version-text" @click="viewUpdateLog">
        <a-badge :count="subscriptCount" dot :offset="[5, -2]"
          >v.{{ appStore.version }}</a-badge
        >
      </div>
    </template>
  </a-popover>
  <UpdateLog v-model:visible="drawerVisible" />
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, defineAsyncComponent } from 'vue';
  import { useAppStore } from '@/store';
  import MyStorage from '@/utils/storage';

  const UpdateLog = defineAsyncComponent(() => import('./updateLog.vue'));

  const appStore = useAppStore();
  const storage = new MyStorage();

  const menuCollapse = computed(() => appStore.menuCollapse);

  const subscriptCount = ref<number>(1);
  const drawerVisible = ref<boolean>(false);

  /**
   * 系统更新日志
   */
  const viewUpdateLog = () => {
    subscriptCount.value = 0;
    drawerVisible.value = true;
    storage.setStorage('version', appStore.version);
  };

  onMounted(() => {
    const appVersion = storage.getStorage('version');
    if (appVersion && appVersion == appStore.version) {
      subscriptCount.value = 0;
    }
  });
</script>

<style lang="less" scoped>
  .version,
  .version-icon {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-text-3);
    cursor: pointer;
    font-size: 12px;
    &:hover {
      color: rgb(var(--primary-6));
    }
  }
  .version-icon {
    color: var(--color-text-3);
    cursor: pointer;
  }
  .version-text {
    color: var(--color-text-3);
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: rgb(var(--primary-6));
    }
  }
</style>
