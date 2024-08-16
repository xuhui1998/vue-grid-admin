<template>
  <VCharts
    v-if="renderChart"
    ref="VChartsRef"
    :option="options"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import VCharts from 'vue-echarts';
  // import { useAppStore } from '@/store';

  defineProps({
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  });
  // const appStore = useAppStore();
  // const theme = computed(() => {
  //   if (appStore.theme === 'dark') return 'dark';
  //   return '';
  // });
  const VChartsRef = ref();
  const renderChart = ref(false);
  // wait container expand
  nextTick(() => {
    renderChart.value = true;
  });

  defineExpose({
    get VChartsRef() {
      return VChartsRef.value ? VChartsRef.value : undefined;
    },
  });
</script>

<style scoped lang="less"></style>
