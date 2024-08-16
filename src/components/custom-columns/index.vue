<template>
  <a-popover
    trigger="click"
    position="br"
    :content-style="{ minWidth: '120px', padding: '6px 8px 10px' }"
    popup-container=".container"
  >
    <a-tooltip :content="tooltipContent" mini position="tr">
      <a-button class="setting-icon">
        <template #icon>
          <component v-if="icon" :is="icon"></component>
          <IconSelectAll v-else :size="16" />
        </template>
      </a-button>
    </a-tooltip>
    <template #content>
      <a-scrollbar style="max-height: 300px; overflow: auto">
        <VueDraggable
          v-model="innerColumns"
          filter=".drag-item-disabled"
          :animation="150"
          ghostClass="ghost"
          @update="onUpdate"
          @move="onMove"
        >
          <div
            v-for="item in innerColumns"
            :key="item.dataIndex"
            :class="['drag-item', { 'drag-item-disabled': item.fixed }]"
            :data-fixed="item.fixed"
          >
            <div class="drag-item-move"><icon-drag-dot-vertical /></div>
            <!-- :disabled="item.fixed === 'left' || item.fixed === 'right'" -->
            <a-checkbox
              v-model:model-value="item.show"
              @change="onChangeBox"
              >{{ item.title }}</a-checkbox
            >
          </div>
        </VueDraggable>
      </a-scrollbar>
      <a-divider :margin="6" />
      <a-button type="primary" size="mini" long @click="resetColumns">
        <template #icon><icon-refresh /></template>
        <template #default>重置</template>
      </a-button>
    </template>
  </a-popover>
</template>
<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import { TableColumnData } from '@arco-design/web-vue';
  import { useUserStore } from '@/store';
  import { cloneDeep } from 'lodash';
  import { VueDraggable } from 'vue-draggable-plus';
  import Storage from '@/utils/storage';

  const props = withDefaults(
    defineProps<{
      columns: TableColumnData[] | any[];
      // 唯一值对应表的列的标识
      columnKey: string;
      tooltipContent?: string;
      icon?: string;
      // 自定义加载状态是否完成
      load?: boolean;
    }>(),
    {
      tooltipContent: '自定义列',
      load: true,
    }
  )
  const emit = defineEmits<{
    (e: 'setColumn', val: any): void;
  }>();

  const store = useUserStore();
  const storage = new Storage();
  const storageKey = ref(`${props.columnKey}Columns-${store.id}`);

  const innerColumns = ref<TableColumnData[]>([]);
  const defaultColumns = ref<TableColumnData[]>(
    cloneDeep(
      props.columns.map((item) => {
        return {
          ...item,
          show: true,
        };
      })
    )
  );

  const onChangeBox = () => {
    storage.setStorage(storageKey.value, JSON.stringify(innerColumns.value));
    emit('setColumn', innerColumns.value);
  };

  const resetColumns = () => {
    innerColumns.value = defaultColumns.value.map((item) => {
      return {
        ...item,
        show: true,
      };
    });
    storage.setStorage(storageKey.value, JSON.stringify(defaultColumns.value));
    emit('setColumn', innerColumns.value);
  };

  const onUpdate = () => {
    onChangeBox();
  };

  const onMove = (e: any) => {
    if (e.related?.getAttribute('data-fixed')) return false
  };

  const initColumns = () => {
    const storageColumns = storage.getStorage(storageKey.value);
    if (storageColumns) {
      innerColumns.value = JSON.parse(storageColumns);
      onChangeBox();
    } else {
      innerColumns.value = props.columns.map((item) => {
        return {
          ...item,
          show: true,
        };
      });
    }
  };

  watch(
  () => props.load,
  (val) => {
    if (val) {
      initColumns();
    }
  },
  { deep: true, immediate: true }
  );

  onMounted(() => {
    if (!props.load) return;
    initColumns();
  });
</script>
<style lang="less" scoped>
  :deep(.arco-checkbox) {
    line-height: 26px;
    .arco-checkbox-label {
      font-size: 12px;
    }
  }
  .drag-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-right: 5px;
    &-move {
      padding-left: 2px;
      padding-right: 2px;
      cursor: move;
    }
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .drag-item-disabled {
    .drag-item-move {
      color: var(--color-text-4);
      cursor: not-allowed;
    }
    // :deep(.arco-checkbox-label) {}
  }
</style>
