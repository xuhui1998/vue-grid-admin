<template>
  <Wrapper :title="title">
    <a-card :bordered="false">
      <a-card-grid v-for="(item, index) in list" :key="index" hoverable>
        <a-card class="card-item" :bordered="false">
          <template #title>
            <div class="flex align-center">
              <SvgIcon :icon-class="item.icon" :size="32"></SvgIcon>
              <span class="ml-10">{{ item.name }}</span>
            </div>
          </template>
          <div class="content">{{ item.desc }}</div>
          <div class="flex-row-between extra mt-10">
            <span>{{ item.belong }}</span>
            <span>{{ item.date }}</span>
          </div>
        </a-card>
      </a-card-grid>
    </a-card>
  </Wrapper>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      title?: string;
    }>(),
    {
      title: '项目',
    }
  );

  const list = [
    {
      name: 'GitHub',
      belong: 'Grid开源组',
      icon: 'github',
      desc: '面向开源及私有软件项目的托管平台',
      date: '2024-07-06',
    },
    {
      name: 'Vue',
      belong: 'Grid开源组',
      icon: 'vue',
      desc: '用于构建用户界面的渐进式JavaScript框架',
      date: '2024-07-06',
    },
    {
      name: 'HTML5',
      belong: 'Grid开源组',
      icon: 'html5',
      desc: '超文本标记语言（HTML）的第五次重大修订版本',
      date: '2024-07-06',
    },
    {
      name: 'React',
      belong: 'Grid开源组',
      icon: 'react',
      desc: '用于构建用户界面的JavaScript库',
      date: '2024-07-06',
    },
    {
      name: 'JavaScript',
      belong: 'Grid开源组',
      icon: 'javascript',
      desc: '用于网页开发的高级编程语言',
      date: '2024-07-06',
    },
    {
      name: 'TypeScript',
      belong: 'Grid开源组',
      icon: 'typescript',
      desc: 'JavaScript 的超集，为JavaScript增加了静态类型检查等特性',
      date: '2024-07-06',
    },
  ];
</script>

<script lang="ts">
  export default {
    name: 'ProjectPanel',
  };
</script>

<style scoped lang="less">
  .card-item {
    cursor: pointer;
    &:hover {
      .arco-icon {
        transform: scale(1.2);
        transition: all 0.3s;
      }
    }
  }
  .card-item :deep(.arco-card-header) {
    border: none;
    overflow: inherit;
    .arco-card-header-title {
      overflow: inherit;
    }
  }
  .extra {
    color: var(--color-text-3);
  }
</style>
