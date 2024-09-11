<template>
  <GridDrawer
    v-model:visible="visible"
    :width="350"
    title="页面设置"
    cancel-text="关闭"
    ok-text="复制配置"
    @ok="copySettings"
    @on-cancel="cancel"
  >
    <Block title="页面布局">
      <Layout />
    </Block>
    <Block :options="contentOpts" :title="$t('settings.content')" />
    <Block :options="othersOpts" :title="$t('settings.otherSettings')" />
  </GridDrawer>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { useClipboard } from '@vueuse/core';
  import { useAppStore } from '@/store';
  import Block from './block.vue';
  import Layout from './layout.vue';

  const appStore = useAppStore();
  const { t } = useI18n();
  const { copy } = useClipboard();
  const visible = computed(() => appStore.globalSettings);
  const contentOpts = computed(() => [
    { name: 'settings.navbar', key: 'navbar', defaultVal: appStore.navbar },
    {
      name: 'settings.menu',
      key: 'menu',
      defaultVal: appStore.menu,
    },
    {
      name: 'settings.topMenu',
      key: 'topMenu',
      defaultVal: appStore.topMenu,
    },
    { name: 'settings.footer', key: 'footer', defaultVal: appStore.footer },
    { name: 'settings.tabBar', key: 'tabBar', defaultVal: appStore.tabBar },
    {
      name: 'settings.menuFromServer',
      key: 'menuFromServer',
      defaultVal: appStore.menuFromServer,
    },
    {
      name: 'settings.menuWidth',
      key: 'menuWidth',
      defaultVal: appStore.menuWidth,
      type: 'number',
    },
  ]);
  const othersOpts = computed(() => [
    {
      name: '色弱模式',
      key: 'colorWeak',
      defaultVal: appStore.colorWeak,
    },
  ]);

  const cancel = () => {
    appStore.updateSettings({ globalSettings: false });
  };
  const copySettings = async () => {
    const text = JSON.stringify(appStore.$state, null, 2);
    await copy(text);
    Message.success(t('settings.copySettings.message'));
  };
</script>

<style scoped lang="less"></style>
