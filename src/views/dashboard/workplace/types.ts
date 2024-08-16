export interface SumDataItems {
  reg_user_count: number | string;
  all_money: number | string;
  all_pay_count: number | string;
  all_pay_user: number | string;
  new_pay_user: number | string;
  new_user_all_pay: number | string;
  new_pay_count: number | string;
}

export interface EChartsItems {
  name: string;
  data: Array<number | string>;
}

export interface EChartsProps {
  series: EChartsItems;
  xAxis: string[];
}

export class EchartsFilterData {
  /**
   * 商户id
   */
  merchantIds: string[] = [];

  /**
   * 日期 1: 30日 2: 今日
   */
  date = '1';
}
