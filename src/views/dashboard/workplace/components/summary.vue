<template>
  <a-tabs>
    <a-tab-pane key="1" :title="'本月数据'">
      <SumData :sum-data="summaryData.today"></SumData>
    </a-tab-pane>
    <a-tab-pane key="2" :title="'上月数据'">
      <SumData :sum-data="summaryData.yesterday"></SumData>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
  import { ref, defineAsyncComponent, watch } from 'vue';

  const SumData = defineAsyncComponent(() => import('./sumData.vue'));

  const props = defineProps({
    sumData: {
      type: Object,
    },
  });

  const summaryData = ref();

  watch(
    () => props.sumData,
    (val) => {
      summaryData.value = val;
    },
    { deep: true, immediate: true }
  );
</script>

<style lang="less" scoped>
  .arco-card {
    margin-top: 10px;
  }
</style>
