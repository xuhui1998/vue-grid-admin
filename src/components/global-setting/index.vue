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
    <Block :options="contentOpts" title="页面配置" />
    <Block :options="othersOpts" title="其他配置" />
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
    { name: '多页签', key: 'navbar', defaultVal: appStore.navbar },
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
      name: '显示水印',
      key: 'watermark',
      defaultVal: appStore.watermark,
    },
    {
      name: '色弱模式',
      key: 'colorWeak',
      defaultVal: appStore.colorWeak,
    },
    {
      name: '灰色模式',
      key: 'grey',
      defaultVal: appStore.grey,
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
