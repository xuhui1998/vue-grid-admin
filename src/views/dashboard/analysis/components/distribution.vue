<template>
  <a-spin :loading="loading" style="width: 100%">
    <Wrapper :title="title">
      <Chart ref="chartRef" height="360px" :option="chartOption" />
    </Wrapper>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick, onMounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { AnyObject } from '@/types/global';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import { TooltipOption } from 'echarts/types/dist/shared';
  import useChartOption from '@/hooks/chart-option';

  const props = defineProps<{
    chartOptions: AnyObject[];
    title?: string;
    tooltipTemplate?: (params: ToolTipFormatterParams) => string;
    tooltipConfig?: TooltipOption;
    seriesConfig?: AnyObject;
  }>();

  const defaultTooltipTemplate = (params: ToolTipFormatterParams) => {
    return `<div>
        <p class="tooltip-title">${params.name}</p>
        <div class="pie-content-panel">
          <div class="flex-row-between">
            <p>充值: ${new Intl.NumberFormat().format(params.value)}</p>
            <p class="tooltip-value" :key="item.componentIndex">
              (${params.percent}%)
            </p>
          </div>
        </div>
      </div>`;
  };

  const chartRef = ref();

  const { loading, setLoading } = useLoading();
  const { chartOption } = useChartOption((isDark) => {
    return {
      legend: {
        left: 'center',
        data: [],
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        textStyle: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        },
        itemStyle: {
          borderWidth: 0,
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter(params: ToolTipFormatterParams) {
          return props.tooltipTemplate
            ? props.tooltipTemplate(params)
            : defaultTooltipTemplate(params);
        },
        className: 'echarts-tooltip-diy',
        ...props.tooltipConfig,
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '70%'],
          center: ['50%', '50%'],
          label: {
            fontSize: 13,
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          },
          itemStyle: {
            borderColor: isDark ? '#232324' : '#fff',
            borderWidth: 1,
            borderRadius: 10,
          },
          data: [],
          ...props.seriesConfig,
        },
      ],
    };
  });

  const fetchData = async (areas: AnyObject[]) => {
    setLoading(true);
    try {
      areas.forEach((item, index) => {
        chartOption.value.legend?.data.push(item.name);
        chartOption.value.series[0]?.data.push(item);
      });
      chartOption.value.series[0]?.data.sort((a, b) => b.value - a.value);
      nextTick(() => {
        chartRef.value.VChartsRef?.setOption(chartOption.value);
      });
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  watch(
    () => props.chartOptions,
    (val: any) => {
      if (val) {
        // setDefaultPieData();
        fetchData(val);
      }
    },
    { deep: true, immediate: true }
  );

  defineExpose({
    chartRef,
  });

  onMounted(() => {
    // console.log(props.chartOptions);
    // fetchData(props.chartOptions);
  });
</script>

<script lang="ts">
  export default {
    name: 'Distribution',
  };
</script>

<style lang="less" scoped></style>
