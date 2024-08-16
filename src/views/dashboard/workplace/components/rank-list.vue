<template>
  <a-card
    class="general-card"
    :title="title"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }"
  >
    <template #extra>
      <a-link>查看更多</a-link>
    </template>
    <div>
      <div v-for="(item, idx) in list" :key="idx" class="item">
        <a-tag :color="item.type" size="small">{{ item.label }}</a-tag>
        <span class="item-content">
          {{ item.content }}
        </span>
        <span>{{ item.data }}</span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      title: string;
    }>(),
    {
      title: '',
    }
  );

  const list = [
    {
      type: 'orangered',
      label: 'TOP1',
      content: '南京落尘文化传媒有限公司',
      data: '130983',
    },
    {
      type: 'cyan',
      label: 'TOP2',
      content: '南京落尘文化传媒有限公司',
      data: '130983',
    },
    {
      type: 'blue',
      label: 'TOP3',
      content: '南京落尘文化传媒有限公司',
      data: '130983',
    },
    {
      type: 'blue',
      label: 'TOP4',
      content: '南京落尘文化传媒有限公司',
      data: '130983',
    },
    {
      type: 'cyan',
      label: 'TOP5',
      content: '南京落尘文化传媒有限公司',
      data: '130983',
    },
  ];
</script>

<script lang="ts">
  export default {
    name: 'RankList',
  };
</script>

<style scoped lang="less">
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
    margin-bottom: 4px;
    .item-content {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 4px;
      color: var(--color-text-2);
      text-decoration: none;
      font-size: 13px;
      margin-left: 10px;
    }
  }
</style>
