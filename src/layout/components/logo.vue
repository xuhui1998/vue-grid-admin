<template>
  <section
    :class="['system-logo ', { collapsed: !isDesktop ? true : menuCollapse }]"
  >
    <div class="flex-row-center">
      <img
        alt="logo"
        src="../../assets/images/logo.png"
        :width="menuCollapse ? 24 : 35"
      />
      <span v-show="!menuCollapse" class="project-name ml-10">
        {{ appStore.projectName }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useAppStore } from '@/store';
  import { useDevice } from '@/hooks/useDevice';

  const appStore = useAppStore();
  const { isDesktop } = useDevice();

  const menuCollapse = computed(() => appStore.menuCollapse);
</script>

<style lang="less" scoped>
  .arco-space {
    padding-left: 20px;
  }
  .system-logo {
    height: 60px;
    color: var(--color-text-1);
    font-size: 20px;
    line-height: 1;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    user-select: none;
    box-sizing: border-box;
    padding: 0 20px;
    .project-name {
      font-size: 18px;
      font-family: 'syht Regular';
      font-weight: bold;
      min-width: 100px;
      overflow: hidden;
    }
  }
  .collapsed {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
