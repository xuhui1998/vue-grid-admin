<template>
  <section class="system-logo" :class="{ collapsed: !isDesktop ? true : menuCollapse }">
    <img
      alt="logo"
      src="../../assets/images/logo.png"
      :width="menuCollapse ? 24 : 35"
    />
    <a-typography-title
      :style="{ margin: 0, fontSize: '18px', fontFamily: 'syht Regular' }"
      :heading="5"
      style="white-space: nowrap"
    >
      <a-badge
        text="beta"
        :offset="[20, -4]"
        :dot-style="{ fontSize: '10px', borderBottomLeftRadius: 0 }"
      >
        <span class="system-name">{{ appStore.projectName }}</span>
      </a-badge>
    </a-typography-title>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store'
import { useDevice } from '@/hooks/useDevice';

const router = useRouter()
const appStore = useAppStore()
const { isDesktop } = useDevice()

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
  // background-color: var(--color-menu-light-bg);
  &.collapsed {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .system-name, .arco-typography {
      display: none;
    }
  }
  .logo {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    transition: all 0.2s;
    overflow: hidden;
    flex-shrink: 0;
  }
  .system-name {
    padding-left: 8px;
    white-space: nowrap;
    transition: color 0.3s;
  }
}
:deep(.arco-badge-text) {
  box-shadow: none;
}
</style>
