<template>
  <Wrapper>
    <template #title>
      <div class="flex-row-between wrapper-title mb-10">
        <span>帮助文档</span>
        <a-link>查看更多</a-link>
      </div>
    </template>
    <a-row :gutter="[10, 35]">
      <a-col v-for="(item, index) in documentList" :key="index" :span="12">
        <a-button type="text">
          <template #icon>
            <component :is="item.icon" :size="16"></component>
          </template>
          <template #default>{{ item.title }}</template>
        </a-button>
      </a-col>
    </a-row>
  </Wrapper>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const documentList = reactive([
    {
      title: '产品概述',
      icon: 'icon-apps',
    },
    {
      title: '接口文档',
      icon: 'icon-file',
    },
    {
      title: '接入指南',
      icon: 'icon-compass',
    },
    {
      title: '常见问题',
      icon: 'icon-question-circle',
    },
  ]);
</script>

<style lang="less" scoped>
  .arco-link {
    font-weight: normal;
  }
  .wrapper {
    height: 180px;
    .wrapper-content {
      padding: 20px;
    }
  }
</style>
