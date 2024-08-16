<template>
  <a-card class="general-card" title="热门计划榜单">
    <a-table :columns="columns" :data="data" :scroll="{ y: 274 }" />
  </a-card>
</template>

<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import { TableColumnData } from '@arco-design/web-vue';

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '排名',
      dataIndex: 'key',
      align: 'center',
      width: 60,
    },
    {
      title: '计划名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '消耗/充值',
      dataIndex: 'salary',
      align: 'center',
      width: 120,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      align: 'center',
      width: 110,
    },
  ]);

  const data = reactive([
    {
      key: '1',
      name: '（名门）南京知临-xs126',
      salary: 23000,
      address: '32 Park Road, London',
      roi: '1.1',
    },
    {
      key: '2',
      name: '（名门）南京知临-xs126',
      salary: 25000,
      address: '35 Park Road, London',
      roi: '1.2',
    },
    {
      key: '3',
      name: '（名门）南京知临-xs126',
      salary: 22000,
      address: '31 Park Road, London',
      roi: '1.3',
    },
    {
      key: '4',
      name: '（名门）南京知临-xs126',
      salary: 17000,
      address: '42 Park Road, London',
      roi: '1.4',
    },
    {
      key: '5',
      name: '（名门）南京知临-xs126',
      salary: 27000,
      address: '62 Park Road, London',
      roi: '1.4',
    },
    {
      key: '6',
      name: '（名门）南京知临-xs126',
      salary: 27000,
      address: '62 Park Road, London',
      roi: '1.4',
    },
    {
      key: '7',
      name: '（名门）南京知临-xs126',
      salary: 27000,
      address: '62 Park Road, London',
      roi: '1.4',
    },
    {
      key: '8',
      name: '（名门）南京知临-xs126',
      salary: 27000,
      address: '62 Park Road, London',
      roi: '1.4',
    },
  ]);
</script>

<script lang="ts">
  export default {
    name: 'HotPlanList',
  };
</script>

<style lang="less" scoped></style>
