<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      title="昨日充值分布"
      :header-style="{ paddingBottom: '0' }"
    >
      <Chart height="381px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import useChartOption from '@/hooks/chart-option';

  const { loading } = useLoading();
  const { chartOption } = useChartOption((isDark) => {
    return {
      legend: {
        left: 'center',
        data: ['商户1', '商户2', '佳佳', '落尘'],
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
      },
      // graphic: {
      //   elements: [
      //     {
      //       type: 'text',
      //       left: 'center',
      //       top: '40%',
      //       style: {
      //         text: '内容量',
      //         textAlign: 'center',
      //         fill: isDark ? '#ffffffb3' : '#4E5969',
      //         fontSize: 14,
      //       },
      //     },
      //     {
      //       type: 'text',
      //       left: 'center',
      //       top: '50%',
      //       style: {
      //         text: '928,531',
      //         textAlign: 'center',
      //         fill: isDark ? '#ffffffb3' : '#1D2129',
      //         fontSize: 16,
      //         fontWeight: 500,
      //       },
      //     },
      //   ],
      // },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 14,
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          },
          itemStyle: {
            borderColor: isDark ? '#232324' : '#fff',
            borderWidth: 1,
          },
          data: [
            {
              value: [148564],
              name: '商户1',
              itemStyle: {
                color: isDark ? '#3D72F6' : '#249EFF',
              },
            },
            {
              value: [334271],
              name: '商户2',
              itemStyle: {
                color: isDark ? '#A079DC' : '#313CA9',
              },
            },
            {
              value: [445694],
              name: '佳佳',
              itemStyle: {
                color: isDark ? '#6CAAF5' : '#21CCFF',
              },
            },
            {
              value: [638943],
              name: '落尘',
              itemStyle: {
                color: isDark ? '#AD87F6' : '#76CF48',
              },
            },
          ],
        },
      ],
    };
  });
</script>

<script lang="ts">
  export default {
    name: 'Distribution',
  };
</script>

<style lang="less" scoped></style>
