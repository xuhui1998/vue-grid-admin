import Mock from 'mockjs';
import dayjs from 'dayjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const getDataOverview = () => {
  return [
    {
      id: '1',
      title: '今日订单',
      value: 983,
      old_value: 483,
      icon: 'day-cost',
    },
    {
      id: '2',
      title: '今日付费',
      value: 19874,
      old_value: 10253,
      icon: 'day-pay',
    },
    {
      id: '3',
      title: '新增用户',
      value: 1382,
      old_value: 1170,
      icon: 'new-user',
    },
    {
      id: '4',
      title: '今日下载量',
      value: 3929,
      old_value: 1598,
      icon: 'download',
    },
    {
      id: '5',
      title: '月销售额',
      value: 72734,
      old_value: 57364,
      icon: 'month-total',
    },
    {
      id: '6',
      title: '年销售额',
      value: 348920,
      old_value: 288463,
      icon: 'year-total',
    },
  ];
};

const getMonthAgo = () => {
  const thirtyDaysAgo = dayjs().subtract(29, 'day');
  const dates = [];
  for (
    let currentDate = thirtyDaysAgo;
    currentDate.isBefore(dayjs()) || currentDate.isSame(dayjs());
    currentDate = dayjs(currentDate).add(1, 'day')
  ) {
    dates.push(currentDate.format('YYYY-MM-DD'));
  }
  return dates;
};

const getChartData = () => {
  return {
    series: {
      order: {
        data: [
          466, 329, 414, 718, 217, 973, 814, 808, 629, 489, 522, 465, 453, 434,
          660, 421, 249, 227, 284, 2131, 278, 373, 757, 599, 286, 287, 319, 519,
          489, 983,
        ],
        name: '订单量',
      },
      // pay_cost: {
      //   data: [
      //     '19895.37',
      //     '15354.23',
      //     '24458.18',
      //     '32436.26',
      //     '46541.75',
      //     '46417.83',
      //     '38149.56',
      //     '40916.71',
      //     '33840.71',
      //     '19324.65',
      //     '27785.80',
      //     '24827.48',
      //     '24829.34',
      //     '25784.88',
      //     '45221.09',
      //     '25852.03',
      //     '13155.01',
      //     '13318.77',
      //     '13470.19',
      //     '11251.62',
      //     '15580.24',
      //     '24040.77',
      //     '55670.06',
      //     '43626.98',
      //     '19451.69',
      //     '20515.62',
      //     '23294.03',
      //     '41199.89',
      //     '39617.12',
      //     '19874.89',
      //   ],
      //   name: '付费金额',
      // },
      new_user: {
        data: [
          1397, 1522, 913, 1205, 806, 1933, 1786, 1024, 1614, 2475, 1509, 2454,
          1442, 1121, 1647, 1409, 929, 732, 1278, 1606, 1972, 2364, 1150, 1586,
          1277, 752, 1313, 1506, 1170, 1382,
        ],
        name: '新增用户',
      },
      download: {
        data: [
          3450, 2164, 2110, 2063, 1707, 2443, 3411, 8912, 5853, 2641, 2441,
          2503, 3084, 2744, 1802, 2250, 2464, 4350, 3067, 5247, 3353, 3511,
          7812, 5363, 3631, 5431, 4523, 4614, 2859, 3929,
        ],
        name: '下载量',
      },
    },
    xAxis: getMonthAgo(),
  };
};

const getVisitChartData = () => {
  return [
    {
      value: 12783,
      name: 'GitHub',
    },
    {
      value: 5437,
      name: 'Gitee',
    },
    {
      value: 7986,
      name: '搜索引擎',
    },
    {
      value: 6563,
      name: '广告推送',
    },
    {
      value: 7634,
      name: '论坛论坛',
    },
  ];
};
const getDownloadChartData = () => {
  return [
    {
      value: 6835,
      name: 'GridAdmin官网',
    },
    {
      value: 5341,
      name: 'GitHub',
    },
    {
      value: 4234,
      name: 'Gitee',
    },
    {
      value: 3246,
      name: '搜索引擎',
    },
    {
      value: 4845,
      name: '广告推送',
    },
  ];
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/dashboard/analysis/data'), () => {
      return successResponseWrap(getDataOverview());
    });

    Mock.mock(new RegExp('/api/dashboard/analysis/chart'), () => {
      return successResponseWrap(getChartData());
    });

    Mock.mock(new RegExp('/api/dashboard/analysis/visitChart'), () => {
      return successResponseWrap(getVisitChartData());
    });

    Mock.mock(new RegExp('/api/dashboard/analysis/downloadChart'), () => {
      return successResponseWrap(getDownloadChartData());
    });
  },
});
