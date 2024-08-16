import dayjs from 'dayjs';
import { ShortcutType } from '@arco-design/web-vue';

export const shortcuts: ShortcutType[] | any[] = [
  {
    label: '今天',
    value: () => [dayjs(), dayjs()],
  },
  {
    label: '昨天',
    value: () => [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
  },
  {
    label: '本周',
    value: () => [dayjs().startOf('week'), dayjs().endOf('week')],
  },
  {
    label: '近七天',
    value: () => [dayjs(), dayjs().subtract(7, 'day')],
  },
  {
    label: '本月',
    value: () => [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: '近一个月',
    value: () => [dayjs(), dayjs().subtract(1, 'month')],
  },
  {
    label: '上月',
    value: () => [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
  },
];

export const dayShortcuts = [
  {
    label: '今天',
    value: () => dayjs(),
  },
  {
    label: '昨天',
    value: () => dayjs().subtract(1, 'day'),
  },
]

export const rechargeType: string[] = [
  '常规充值',
  '-',
  '包年',
  '包月',
  '全剧购买',
  '日vip',
];

export const serviceConfigList: { [key: string]: string } = {
  '1': 'IAP',
  '2': 'IAA',
  '3': 'IAAP',
};

export default null;
