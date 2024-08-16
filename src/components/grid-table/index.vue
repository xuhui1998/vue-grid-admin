<template>
  <div class="grid-table">
    <div class="grid-table-settings flex-row-between mb-10">
      <div>
        <slot name="tableHeader"></slot>
      </div>
      <a-space>
        <slot name="tableSetting"></slot>
        <CustomColumnBtn
          v-if="columnKey"
          :columns="columns"
          :column-key="columnKey"
          @set-column="setColumn"
        />
      </a-space>
    </div>
    <a-table
      ref="gridTable"
      :row-key="rowKey"
      :class="className"
      :data="list?.length ? list : state.dataSource"
      :loading="loading"
      :scroll="props.scroll || { x: defaultTableWidth.value }"
      :virtualListProps="virtualListProps"
      :pagination="false"
      :columns="(customColumns as TableColumnData[])"
      :bordered="bordered"
      :sticky-header="true"
      :size="size"
      column-resizable
      :span-method="spanMethod"
      :row-class="rowClass"
      :row-selection="rowSelection ? tableRowSelection : undefined"
      :show-empty-tree="showEmptyTree"
      :expandable="expandable"
      :summary="summary"
      :summary-span-method="summarySpanMethod"
      :default-expand-all-rows="true"
      @sorter-change="sorterChange"
      @select="selectRow"
      @select-all="selectAllRow"
      @expand="expand"
    >
      <template
        v-for="item in flattenColumns(columns)"
        :key="item.slotName"
        #[item.slotName]="{ record, rowIndex, column }"
      >
        <slot
          :name="item.slotName"
          v-bind="{ record, rowIndex, column }"
        ></slot>
      </template>
      <template
        v-for="item in flattenColumns(columns)"
        :key="item.titleSlotName"
        #[item.titleSlotName]="{ record, rowIndex, column }"
      >
        <a-popover
          :content="item.titleTip"
          :content-style="{ fontSize: '13px', padding: '10px 14px', fontWeight: 500 }"
        >
          <div class="title-tip">{{ item.title }}</div>
        </a-popover>
        <!-- <a-tooltip v-if="item.titleTip" :content="item.titleTip">
          <div class="title-tip">{{ item.title }}</div>
        </a-tooltip> -->
      </template>
    </a-table>
    <a-pagination
      v-if="pagination.total && !hidePagination"
      size="mini"
      :total="(pagination.total as number)"
      :current="pagination.pageNo"
      :page-size="pagination.pageSize"
      show-total
      :show-page-size="showPageSize"
      :page-size-options="[10, 20, 50, 100]"
      @change="onPageChange"
      @page-size-change="onPageSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, watch, computed } from 'vue';
  import type {
    TableColumnData,
    TableData,
    TableRowSelection,
    TableExpandable,
    TableBorder,
  } from '@arco-design/web-vue';
  import { TableOperationColumn } from '@arco-design/web-vue/es/table/interface';
  import useLoading from '@/hooks/loading';
  import { useUserStore } from '@/store';
  import MyStorage from '@/utils/storage';
  import { loadData } from '@/api/common';
  import PaginationDto from '@/dto/paginationDto';
  import CustomColumnBtn from '@/components/custom-columns/index.vue';

  const gridTable = ref();

  // const slots = defineSlots<{
  //   default(props: {
  //     rowIndex?: string;
  //     record?: TableColumnData;
  //     column?: Array<any[]>;
  //   }): any;
  //   summaryCell: any;
  // }>();

  const emit = defineEmits<{
    (e: 'sorterChange', dataIndex: string, direction: string): void;
    (e: 'clearRow'): void;
    (
      e: 'select',
      rowKeys: (string | number)[],
      rowKey: string | number,
      record: TableData
    ): void;
    (e: 'selectAll', rowKeys: (string | number)[], isAll: boolean): void;
    (e: 'expand', rowKey: string | number, record: TableData): void;
    (e: 'clearMain',): void;
  }>();

  const props = withDefaults(
    defineProps<{
      rowKey?: string;
      scroll?: { x: number | string; y: number | string };
      virtualListProps?: {};
      columns?: Array<TableColumnData> | any;
      bordered?: boolean | TableBorder;
      size?: 'mini' | 'small' | 'medium' | 'large';
      spanMethod?: (data: {
        record: TableData;
        column: TableColumnData | TableOperationColumn;
        rowIndex: number;
        columnIndex: number;
      }) => { rowspan?: number; colspan?: number } | void;
      summarySpanMethod?: (data: {
        record: TableData;
        column: TableColumnData | TableOperationColumn;
        rowIndex: number;
        columnIndex: number;
      }) => { rowspan?: number; colspan?: number } | void;
      summary?:
        | boolean
        | ((params: {
            columns: TableColumnData[];
            data: TableData[];
          }) => TableData[]);
      rowClass?:
        | string
        | any[]
        | Record<string, any>
        | ((record: TableData, rowIndex: number) => any)
        | undefined;
      className?: string;
      pageSize?: number | undefined;
      rowSelection?: TableRowSelection;
      loadUrl: string;
      formData?: object;
      listType?: string;
      hidePagination?: boolean | object;
      list?: Array<any[]>;
      /* 自定义加载 */
      customLoad?: boolean;
      showEmptyTree?: boolean;
      expandable?: TableExpandable;
      // 自定列的key
      columnKey?: string;
      // 表格数据每页条数key
      pageSizeKey?: string;
      // 是否显示配置表格条数
      showPageSize?: boolean;
    }>(),
    {
      rowKey: 'id',
      size: 'large',
      columns: () => [],
      bordered: { headerCell: true, cell: true, wrapper: true, bodyCell: true },
      rowClass: '',
      className: 'grid-table',
      rowSelection: undefined,
      loadUrl: '',
      listType: '', // 列表数据类型
      hidePagination: false,
      customLoad: false,
      showPageSize: true,
    }
  );

  const defaultTableWidth = computed(() => {
    return props.columns.reduce((sum, item) => sum + item.width, 0)
  });
  // props.scroll = props.scroll || { x: defaultTableWidth.value }

  const { setLoading, loading } = useLoading(true);
  const storage = new MyStorage();
  const store = useUserStore();

  const userKey = props.pageSizeKey ? `${props.pageSizeKey}-${store.id}` : '';

  const pagination: PaginationDto = reactive({
    pageNo: 1,
    pageSize: props.pageSize || 20,
  });
  const customColumns = ref<TableColumnData[]>(props.columns);

  const tableRowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    selectedRowKeys: [],
    onlyCurrent: true,
    ...props.rowSelection,
  });
  const state = reactive({
    dataSource: [] as TableColumnData[],
    formModel: props.formData as any,
    sumArr: {},
    hourArr: {},
    data: {},
  });

  /**
   * 扁平化表头父子级的数据
   * @param arr
   */
  const flattenColumns = (arr: any[]) => {
    const result: any[] = [];
    arr.forEach((item) => {
      if (item.children) {
        result.push(...flattenColumns(item.children));
      } else {
        result.push(item);
      }
    });
    return result;
  };

  /**
   * 设置自定义列
   * @param columnsValue
   */
  const setColumn = (columnsValue: TableColumnData[]) => {
    customColumns.value = columnsValue.filter((item) => item.show);
  };

  /**
   * 加载表格数据
   * @param extendsData 额外排序的参数
   */
  const loadRemoteData = async () => {
    setLoading(true);
    try {
      const { data, code } = await loadData(props.loadUrl, {
        ...state.formModel,
        ...pagination,
      });
      if (code === 200) {
        state.data = data;
        state.dataSource = !props.listType
          ? data.list || data
          : data[props.listType] || [];
        state.sumArr = data.sumArr || data.sumArr || {};
        state.hourArr = data.hourArr || data.hourData || {};
        pagination.total = data.total * 1 || 0;
      }
    } catch (error) {
      // 捕获接口异常错误
    } finally {
      setLoading(false);
    }
  };

  /**
   * 全选表格
   * @param val 全选状态
   */
  const selectAllRow = (val: boolean) => {
    let arr = state.dataSource.map((item) => {
      if (!item.disabled) {
        return item[props.rowKey];
      }
    });
    arr = arr.filter((ele) => {
      return ele != undefined;
    });
    if (!val) {
      arr.map((ele) => {
        if (tableRowSelection.selectedRowKeys?.includes(ele)) {
          tableRowSelection.selectedRowKeys.splice(
            tableRowSelection.selectedRowKeys.indexOf(ele),
            1
          );
        }
      });
      // tableRowSelection.selectedRowKeys = [];
      emit('selectAll', tableRowSelection.selectedRowKeys, val);
      return;
    }

    tableRowSelection.selectedRowKeys = Array.from(
      new Set([...tableRowSelection.selectedRowKeys, ...arr])
    );
    emit('selectAll', tableRowSelection.selectedRowKeys, val);
  };

  /**
   * 选择单行
   * @param rowKeys 选中的行
   */
  const selectRow = (
    rowKeys: (string | number)[],
    rowKey: string | number,
    record: TableData
  ) => {
    // console.log(rowKeys);
    tableRowSelection.selectedRowKeys = rowKeys;
    // console.log(tableRowSelection)
    emit('select', rowKeys, rowKey, record);
  };

  /**
   * 点击展开行
   * @param rowKeys 选中的行
   * @param record 表格行数据
   */
  const expand = (rowKey: string | number, record: TableData) => {
    emit('expand', rowKey, record);
  };

  /**
   * 分页方法
   * @param current 当前页
   */
  const onPageChange = (current: number) => {
    pagination.pageNo = current;
    tableRowSelection.selectedRowKeys = [];
    loadRemoteData();
    emit('clearRow');
    emit('clearMain')
  };

  /**
   * 每页条数变化
   * @param pageSize 每页条数
   */
  const onPageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize;
    loadRemoteData();
    setUserPageSize(pageSize);
    emit('clearMain')
  };

  /**
   * 表格排序方法
   * @param dataIndex 排序的字段
   * @param direction 排序的方向
   */
  const sorterChange = (dataIndex: string, direction: string) => {
    pagination.sortField = dataIndex;
    pagination.sortOrder = direction;
    loadRemoteData();
  };

  /**
   * 查询方法
   */
  const onSearch = () => {
    pagination.reset;
    tableRowSelection.selectedRowKeys = [];
    loadRemoteData();
  };

  /**
   * 重置方法
   */
  const onReset = () => {
    state.formModel = {};
    pagination.pageNo = 1;
    tableRowSelection.selectedRowKeys = [];
    loadRemoteData();
  };

  /**
   * 设置用户的pageSize
   */
  const setUserPageSize = (number: number) => {
    if (!userKey) return;
    storage.setStorage(userKey, number);
  };

  /**
   * 获取缓存用户的pageSize
   */
  const getUserPageSize = () => {
    if (!userKey) return;
    const storagePageSize = storage.getStorage(userKey);
    if (storagePageSize) {
      pagination.pageSize = storagePageSize;
    }
  };

  /**
   * 抛出GridTable实例
   */
  defineExpose({
    table: gridTable,
    tableState: state,
    tableRowSelection,
    loadRemoteData,
    onSearch,
    onReset,
    sorterChange,
    setLoading,
    loading,
  });

  watch(
    () => props.formData,
    (val) => {
      state.formModel = val;
    },
    { deep: true }
  );

  onMounted(() => {
    getUserPageSize();
    if (props.customLoad) {
      setLoading(false);
      return;
    };
    loadRemoteData();
  });
</script>

<style lang="less" scoped>
  :deep(.arco-pagination) {
    justify-content: flex-end;
    margin-top: 12px;
    padding-right: 16px;
  }
  .grid-table {
    position: relative;
    &-settings {
      position: absolute;
      right: 16px;
      top: -35px;
      z-index: 9;
    }
  }
  // :deep(.advertiser-table) {
  //   .arco-table-body {
  //     padding-top: 36px;
  //     .arco-table-td-content {
  //       line-height: 1;
  //     }
  //   }
  //   .arco-table-tfoot {
  //     position: absolute;
  //     top: 40px;
  //   }
  //   .arco-table-tr:hover {
  //     .arco-table-td::before {
  //       background-color: rgb(var(--orange-1)) !important;
  //     }
  //     .arco-table-td {
  //       background-color: rgb(var(--orange-1)) !important;
  //     }
  //   }
  //   .arco-table-tr-empty:hover {
  //     .arco-table-td::before {
  //       background-color: transparent !important;
  //     }
  //     .arco-table-td {
  //       background-color: transparent !important;
  //     }
  //   }
  //   .arco-table-tr-summary {
  //     .arco-table-td {
  //       background-color: rgb(var(--orange-1)) !important;
  //       border-bottom: 1px solid var(--color-neutral-3) !important;
  //     }
  //   }
  // }
  // :deep(.arco-table-tr-summary) {
  //   .arco-table-col-fixed-left:after {
  //     right: 0;
  //     left: unset;
  //     transform: translateX(100%);
  //     box-shadow: inset 6px 0 8px -3px rgba(0, 0, 0, 0.15);
  //   }
  // }
</style>
