<template>
  <a-spin :loading="chartLoading" style="width: 100%">
    <a-card
      :class="['general-card', className]"
      :header-style="{ padding: title ? '10px 16px' : '0' }"
      :body-style="{
        border: border ? '1px solid var(--color-border-2)' : 'none',
        borderRadius: '4px',
      }"
    >
      <div v-if="isEmpty(chartOption.series)">
        <a-empty></a-empty>
      </div>
      <div v-else>
        <Chart ref="chartRef" height="361px" :option="chartOption" />
      </div>
      <template #title>
        {{ title }}
        <span v-if="titleCycle" class="cycle">({{ titleCycle }})</span>
      </template>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, watch, reactive, nextTick } from 'vue';
  import { graphic } from 'echarts';
  import useLoading from '@/hooks/loading';
  import useChartOption from '@/hooks/chart-option';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import { AnyObject } from '@/types/global';
  import { isEmpty } from 'lodash';
  import { useLogStore } from '@/store';
  import { EChartsProps, EchartsFilterData } from '../types';

  const props = withDefaults(
    defineProps<{
      chartOptions: EChartsProps | undefined;
      title?: string;
      titleCycle?: string;
      grid?: AnyObject;
      tooltipTemplate?: (params: Array<ToolTipFormatterParams>) => string;
      border?: boolean;
      className?: string;
      chartLoading?: boolean;
    }>(),
    {
      border: true,
      chartLoading: false,
    }
  )

  function graphicFactory(side: AnyObject) {
    return {
      type: 'text',
      bottom: '8',
      ...side,
      style: {
        text: '',
        textAlign: 'center',
        fill: '#4E5969',
        fontSize: 12,
      },
    };
  }

  const store = useLogStore();

  const { loading, setLoading } = useLoading(true);
  const chartRef = ref();
  const xAxis = ref<string[]>([]);
  const graphicElements = ref([
    graphicFactory({ left: '2.6%' }),
    graphicFactory({ right: 0 }),
  ]);

  const defaultTooltipTemplate = (params: Array<ToolTipFormatterParams>) => {
    const [firstElement] = params as ToolTipFormatterParams[];
    return `<div>
        <p class="tooltip-title">${firstElement.axisValueLabel}</p>
          ${params
            .map(
              (item: ToolTipFormatterParams) => `
              <div class="content-panel">
                ${item.marker}
                <span>${item.seriesName}</span>
                <p class="tooltip-value" :key="item.componentIndex">
                  ${Number(item.value).toLocaleString()}
                </p>
              </div>
              `
            )
            .join('')}
      </div>`;
  };

  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: '4.6%',
        right: '0',
        top: '12%',
        bottom: '30',
        ...props.grid,
      },
      // dataZoom: [
      //   {
      //     type: 'slider',
      //     realtime: true,
      //     start: 0,
      //     end: 20,
      //     xAxisIndex: [0],
      //   },
      // ],
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
          // rotate: 30,
          interval: 'auto',
          formatter(value: number, idx: number) {
            if (idx === 0) return '';
            if (idx === xAxis.value.length - 1) return '';
            return `${value}`;
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: (idx: number) => {
            if (idx === 0) return false;
            if (idx === xAxis.value.length - 1) return false;
            return true;
          },
          lineStyle: {
            color: '#E5E8EF',
          },
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        // axisLabel: {
        //   formatter(value: any, idx: number) {
        //     if (idx === 0) return value;
        //     return `${value}k`;
        //   },
        // },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#E5E8EF',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: Array<ToolTipFormatterParams>) {
          return props.tooltipTemplate
            ? props.tooltipTemplate(params)
            : defaultTooltipTemplate(params);
        },
        className: 'echarts-tooltip-diy',
      },
      graphic: {
        elements: graphicElements.value,
      },
      legend: {
        data: [],
      },
      series: [],
    };
  });
  const setChartData = (data: string[]) => {
    data.forEach((el: string, idx: number) => {
      // if (idx === 0) {
      //   graphicElements.value[0].style.text = el;
      // }
      // if (idx === data.length - 1) {
      //   graphicElements.value[1].style.text = el;
      // }
    });
  };

  const fetchData = async (areas: EChartsProps) => {
    // console.log(chartRef.value.VChartsRef);
    const lineColors = areas.series
      ? Object.entries(areas.series).map(() => {
          return [
            'rgba(30, 231, 255, 1)',
            'rgba(36, 154, 255, 1)',
            'rgba(111, 66, 251, 1)',
          ];
        })
      : [];
    setLoading(true);
    console.log(loading.value);
    try {
      xAxis.value = areas.xAxis;
      setChartData(areas.xAxis);
      Object.entries(areas.series).forEach(([key, value], index) => {
        // console.log(areas.series);
        chartOption.value.legend?.data.push(value.name);
        chartOption.value.series?.push({
          data: value.data,
          type: 'line',
          name: value.name,
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: lineColors[index][0],
              },
              {
                offset: 0.5,
                color: lineColors[index][1],
              },
              {
                offset: 1,
                color: lineColors[index][2],
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 126, 255, 0.16)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        });
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  watch(
    () => props.chartOptions,
    (val: any) => {
      if (val) {
        nextTick(() => {
          fetchData(val);
        });
      }
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped lang="less">
  .cycle {
    font-size: 13px;
    font-weight: 400;
    color: #666;
  }
  :deep(.arco-select) {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .arco-empty {
    height: 361px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .expand-chart {
    height: 412px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .collapse-chart {
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .arco-spin {
    display: block;
  }
</style>
