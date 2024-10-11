export interface EChartsItems {
  name: string;
  data: Array<number | string>;
}

export interface EChartsProps {
  series: EChartsItems;
  xAxis: string[];
}
