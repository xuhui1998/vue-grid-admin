<template>
  <GridDrawer
    :visible="visible"
    :width="400"
    title="更新记录"
    ok-text="关闭"
    hide-cancel
    placement="left"
    @on-ok="close"
    @on-cancel="close"
  >
    <a-timeline reverse>
      <a-timeline-item v-for="(item, index) in updateLogList" :key="index">
        <div class="grid-update-log">
          <div class="version">{{ item.version }}</div>
          <div class="time">{{ item.create_time }}</div>
          <div class="title">{{ logTitle(item.type) }}</div>
          <ul>
            <li v-for="(content, idx) in item.content" :key="idx">
              {{ content }}
            </li>
          </ul>
        </div>
      </a-timeline-item>
    </a-timeline>
  </GridDrawer>
</template>

<script lang="ts" setup>
  import updateLogList from '@/config/updateLog.json';

  defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
  }>();

  type UpdateLogTypeItem = 'add' | 'bug' | 'optimize';

  const typeList = [
    {
      type: 'add',
      title: '🆕 新增功能',
    },
    {
      type: 'bug',
      title: '🐛 问题修复',
    },
    {
      type: 'optimize',
      title: '💎 功能优化',
    },
  ];

  const logTitle = (type: UpdateLogTypeItem) => {
    return typeList.find((item) => item.type === type)?.title;
  };

  const close = () => {
    emit('update:visible', false);
  };
</script>

<script lang="ts">
  export default {
    name: 'UpdateLog',
  };
</script>

<style lang="less" scoped>
  :deep(.arco-timeline-item-dot-line) {
    display: none;
  }
  .grid-update-log {
    .version {
      font-weight: 600;
      font-size: 18px;
      height: 46px;
      line-height: 46px;
    }
    .time {
      color: var(--color-text-2);
      height: 32px;
      line-height: 32px;
    }
    .title {
      font-weight: 600;
      font-size: 16px;
      height: 32px;
      line-height: 32px;
    }
  }
</style>
