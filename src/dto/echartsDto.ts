import { EChartsItems } from '@/types/echarts';

export class EChartsPropsDto {
  series: EChartsItems = { name: '', data: [] };
  xAxis: string[] = [];
}