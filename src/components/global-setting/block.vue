<template>
  <div class="block">
    <a-divider>{{ title }}</a-divider>
    <slot></slot>
    <div v-for="option in options" :key="option.name">
      <div
        v-if="option?.layout.includes(appStore.layout)"
        class="switch-wrapper"
      >
        <span>{{ option.name }}</span>
        <form-wrapper
          :type="option.type"
          :name="option.key"
          :options="option.options"
          :default-value="option.defaultVal"
          @input-change="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useAppStore } from '@/store';
  import FormWrapper from './form-wrapper.vue';

  interface OptionsProps {
    name: string;
    key: string;
    type?: string;
    options?: Array<{ label: string; value: string }>;
    defaultVal?: boolean | string | number;
    layout: string[];
  }
  defineProps({
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<OptionsProps[]>,
      default() {
        return [];
      },
    },
  });
  const appStore = useAppStore();
  const handleChange = async ({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }) => {
    if (key === 'colorWeak') {
      document.body.style.filter = value ? 'invert(80%)' : 'none';
    }
    if (key === 'grey') {
      document.body.style.filter = value ? 'grayscale(100%)' : 'none';
    }
    if (key === 'menuFromServer' && value) {
      await appStore.fetchServerMenuConfig();
    }
    if (key === 'topMenu') {
      appStore.updateSettings({
        menuCollapse: false,
      });
    }
    appStore.updateSettings({ [key]: value });
  };
</script>

<style scoped lang="less">
  .block {
    margin-bottom: 24px;
  }

  .title {
    margin: 10px 0;
    padding: 0;
    font-size: 14px;
  }

  .switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
  }
</style>
