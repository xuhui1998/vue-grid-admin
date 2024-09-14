<template>
  <Watermark :show="appStore.watermark">
    <a-config-provider :locale="locale">
      <router-view />
      <global-setting />
    </a-config-provider>
  </Watermark>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
  import useLocale from '@/hooks/locale';
  import { toTreeArray } from 'xe-utils';
  import { RouteRecordNormalized } from 'vue-router';
  import { useAppStore } from './store';
  import router from './router';

  const appStore = useAppStore();

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  });

  router.beforeEach((to) => {
    const treeArr = toTreeArray(appStore.serverMenu);
    const routeItem: RouteRecordNormalized | undefined = treeArr.find(
      (item) => item.name === to.name
    );
    const myParam: string | number = routeItem?.meta.locale as string | number;
    document.title = myParam
      ? `${myParam}-${appStore.projectName}`
      : `${appStore.projectName}`;
  });
</script>
