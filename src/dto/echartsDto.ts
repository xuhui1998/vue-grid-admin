import { EChartsItems } from '@/types/echarts';

export default class EChartsPropsDto {
  series: EChartsItems = { name: '', data: [] };

  xAxis: string[] = [];
}
