<template>
  <Container>
    <template #header>
      <DataPanel />
    </template>
    <template #content>
      <ContentChart
        :class-name="'layer-bg mb-10'"
        :chart-options="state.trendChartData"
        title="数据趋势"
        :grid="{ left: '3.2%', right: '3%' }"
        :border="false"
        :chart-loading="loading"
        :tooltip-template="chartTooltipTemplate"
      ></ContentChart>
      <a-grid
        :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }"
        :col-gap="12"
        :row-gap="20"
      >
        <a-grid-item>
          <Distribution
            title="访问来源"
            :chart-options="state.visitChartData"
          />
        </a-grid-item>
        <a-grid-item>
          <Distribution
            title="下载来源"
            :chart-options="state.downloadChartData"
            :series-config="{
              radius: [20, 140],
              roseType: 'radius',
              itemStyle: {
                borderRadius: 5,
              },
            }"
          />
        </a-grid-item>
      </a-grid>
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { reactive, onMounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import {
    trendChartData,
    visitChartData,
    downloadChartData,
  } from '@/api/dashboard';
  import { AnyObject } from '@/types/global';
  import EChartsPropsDto from '@/dto/echartsDto';
  import DataPanel from './components/data-panel.vue';
  import ContentChart from './components/content-chart.vue';
  import Distribution from './components/distribution.vue';

  const { loading, setLoading } = useLoading();

  const state = reactive({
    trendChartData: {} as EChartsPropsDto,
    visitChartData: [] as AnyObject[],
    downloadChartData: [] as AnyObject[],
  });

  const chartTooltipTemplate = (params: Array<ToolTipFormatterParams>) => {
    const [firstElement] = params as ToolTipFormatterParams[];
    return `<div>
        <p class="tooltip-title">${firstElement.axisValueLabel}</p>
          ${params
            .map(
              (item: ToolTipFormatterParams) => `
              <div class="content-panel flex-column">
                ${item.marker}
                <div class="flex-row-between">
                  <div>${item.seriesName}</div>
                  <p class="tooltip-value">
                    ${item.data}
                  </p>  
                </div>
              </div>
              `
            )
            .join('')}
      </div>`;
  };

  const getChartData = async () => {
    setLoading(true);
    const { code, data } = await trendChartData();
    if (code === 200) {
      state.trendChartData = data;
      setLoading(false);
    }
  };

  const getVisitChartData = async () => {
    const { code, data } = await visitChartData();
    if (code === 200) {
      state.visitChartData = data;
    }
  };

  const getDownloadChartData = async () => {
    const { code, data } = await downloadChartData();
    if (code === 200) {
      state.downloadChartData = data;
    }
  };

  onMounted(() => {
    getChartData();
    getVisitChartData();
    getDownloadChartData();
  });
</script>

<script lang="ts">
  export default {
    name: 'Analysis',
  };
</script>

<style lang="less" scoped></style>
