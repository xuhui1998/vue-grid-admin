<template>
  <Wrapper :title="title">
    <a-card :bordered="false">
      <a-card-grid v-for="(item, index) in list" :key="index" hoverable>
        <a-card class="card-item" :bordered="false">
          <div class="flex-column align-center">
            <Component
              :is="item.icon"
              :size="32"
              :style="{ color: item.color }"
            ></Component>
            <span class="nav-name mt-10">{{ item.name }}</span>
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
      title: '快捷导航',
    }
  );

  const list = [
    {
      name: '首页',
      icon: 'icon-home',
      color: '#ffa94d',
    },
    {
      name: '数据分析',
      icon: 'icon-computer',
      color: '#4dabf7',
    },
    {
      name: '指令配置',
      icon: 'icon-command',
      color: '#a9e34b',
    },
    {
      name: '账户关联',
      icon: 'icon-relation',
      color: '#69db7c',
    },
    {
      name: '菜单管理',
      icon: 'icon-menu',
      color: '#da77f2',
    },
    {
      name: '系统设置',
      icon: 'icon-settings',
      color: '#ced4da',
    },
  ];
</script>

<script lang="ts">
  export default {
    name: 'NimbleNav',
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
    :deep(.arco-card-header) {
      border: none;
    }
    .nav-name {
      color: var(--color-text-1);
    }
  }
</style>
