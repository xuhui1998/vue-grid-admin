import { CallbackDataParams } from 'echarts/types/dist/shared';

type OptionsData = {
  cost: string;
  merchant_name: string;
  value: string;
  v_id: string;
  list: Array<{
    cost: string;
    total_recharge: string;
    v_id: string;
    video_title: string;
  }>;
};

export interface ToolTipFormatterParams extends CallbackDataParams {
  axisDim: string;
  axisIndex: number;
  axisType: string;
  axisId: string;
  axisValue: string;
  axisValueLabel: string;
  data: OptionsData;
}

export interface EChartsItems {
  name: string;
  data: Array<number | string>;
}
export interface EChartsProps {
  series: EChartsItems;
  xAxis: string[];
}
