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
    {
      name: '导航栏',
      key: 'navbar',
      defaultVal: appStore.navbar,
      type: 'switch',
      layout: ['left', 'top'],
    },
    {
      name: '菜单栏',
      key: 'menu',
      defaultVal: appStore.menu,
      type: 'switch',
      layout: ['left', 'top'],
    },
    {
      name: '展示底部',
      key: 'footer',
      defaultVal: appStore.footer,
      type: 'switch',
      layout: ['mix', 'left', 'top'],
    },
    {
      name: '标签栏',
      key: 'tabBar',
      defaultVal: appStore.tabBar,
      type: 'switch',
      layout: ['mix', 'left', 'top'],
    },
    {
      name: '展示面包屑',
      key: 'breadcrumb',
      defaultVal: appStore.breadcrumb,
      type: 'switch',
      layout: ['left'],
    },
    // {
    //   name: 'settings.menuFromServer',
    //   key: 'menuFromServer',
    //   defaultVal: appStore.menuFromServer,
    // },
    {
      name: '菜单宽度',
      key: 'menuWidth',
      defaultVal: appStore.menuWidth,
      type: 'number',
      layout: ['mix', 'left', 'top'],
    },
    {
      name: '页面切换效果',
      key: 'transitionName',
      defaultVal: appStore.transitionName,
      options: [
        { label: '无', value: '' },
        { label: '滑动', value: 'fade-slide' },
        { label: '淡入淡出', value: 'fade' },
        { label: '底部退出', value: 'fade-bottom' },
        { label: '缩放退出', value: 'fade-scale' },
        { label: '放大退出', value: 'zoom-fade' },
        { label: '闪现', value: 'zoom-out' },
      ],
      type: 'select',
      layout: ['mix', 'left', 'top'],
    },
  ]);
  const othersOpts = computed(() => [
    {
      name: '显示水印',
      key: 'watermark',
      defaultVal: appStore.watermark,
      layout: ['mix', 'left', 'top'],
    },
    {
      name: '色弱模式',
      key: 'colorWeak',
      defaultVal: appStore.colorWeak,
      layout: ['mix', 'left', 'top'],
    },
    {
      name: '灰色模式',
      key: 'grey',
      defaultVal: appStore.grey,
      layout: ['mix', 'left', 'top'],
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
