import { type CSSProperties } from "vue";

export const statusStyle = (data: any) => {
  if (data !== 1)
    return {
      color: 'var(--color-neutral-5)',
    };
  return {};
};

export const statusColor = (str: string) => {
  if (str === '投放中') return { color: 'var(--color-neutral-10)' };
  if (str === '已暂停') return { color: 'var(--color-neutral-5)' };
  if (str !== '已暂停') return { color: 'rgb(var(--red-6))' };
  return {};
};

export const callbackColor = (record: any) => {
  if (record > 0) return { color: 'rgb(var(--red-6))' };
  return {};
};

export const ROIColor = (roi: any) => {
  if (Number(roi) < 1) return { color: 'rgb(var(--red-6))' };
  if (Number(roi) >= 1) return { color: 'rgb(var(--green-6))' };
  return {};
};

export const profitColor = (profitMoney: any) => {
  const profit = profitMoney.replace(/,/g, '');
  if (profit < 0) return { color: 'rgb(var(--red-6))' };
  if (profit > 0) return { color: 'rgb(var(--green-6))' };
  return {};
};

export const transformColor = (payUserMoney: any, conversionCost: any) => {
  if (payUserMoney > 100) return { color: 'rgb(var(--red-6))' };
  if (payUserMoney > conversionCost && conversionCost > 0)
    return { color: 'rgb(var(--red-6))' };
  if (payUserMoney > 0) return { color: 'rgb(var(--green-6))' };
  return {};
};

export const ARPUColor = (payUserMoney: any, payUserMoneyScale: any) => {
  if (payUserMoney > payUserMoneyScale) return { color: 'rgb(var(--green-6))' };
  return {};
};

export const conversionColor = (
  conversionCost: any,
  payUserMoneyScale: any, // 成本/转化
  payUserMoney: any, // 成本/ARPU
  newUserMoneyScale: any // 首日(1)
) => {
  if (newUserMoneyScale >= 1 && newUserMoneyScale !== 0)
    return { color: 'rgb(var(--green-6))' };
  if (conversionCost >= payUserMoneyScale || conversionCost === 0)
    return { color: 'rgb(var(--red-6))' };
  if (conversionCost <= payUserMoneyScale && conversionCost > 0)
    return { color: 'rgb(var(--green-6))' };
  if (conversionCost > 0 && conversionCost <= payUserMoney)
    return { color: 'rgb(var(--green-6))' };
  return {};
};

export const secondaryColor = (payCounts: any) => {
  if (payCounts >= 2) return { color: 'rgb(var(--green-6))' };
  return {};
};

export const getCharacter = (
  type: string,
  currentRecord: any,
  payUserMoneyScale?: any,
  payUserMoney?: any,
  newUserMoneyScale?: any
) => {
  if (currentRecord === '-' || currentRecord === '--') return currentRecord;
  if (type === 'arrow') {
    if (newUserMoneyScale >= 1 && newUserMoneyScale !== 0)
      return `${currentRecord} ▲`;
    if (currentRecord >= payUserMoneyScale || currentRecord == 0)
      return `${currentRecord} ▼`;
    if (currentRecord <= payUserMoneyScale && currentRecord > 0)
      return `${currentRecord} ▲`;
    if (currentRecord > 0 && currentRecord <= payUserMoney)
      return `${currentRecord} ▲`;
  }
  return `${currentRecord}%`;
};

/**
 * 人均系数
 * @param cpaBidScale ARPU/出价
 * @returns
 */
export const coefficient = (cpaBidScale: number | string) => {
  if (cpaBidScale === '-') return {};
  if (Number(cpaBidScale) > 0.8) {
    return { color: 'rgb(var(--green-6))' };
  }
  if (Number(cpaBidScale) < 0.8) {
    return { color: 'rgb(var(--red-6))' };
  }
  return {};
};

/**
 * 赔付
 * @param cpaBidScale ARPU/出价
 * @returns
 */
export const compensation = (cpaBidScale: number | string) => {
  if (cpaBidScale === '-') return '-';
  return (Number(cpaBidScale) * 1.2).toFixed(2);
};

/**
 * 赔付颜色标准
 * @param cpaBidScale ARPU/出价
 * @returns
 */
export const compensationColor = (cpaBidScale: number | string) => {
  if (cpaBidScale === '-') return {};
  if (Number(cpaBidScale) * 1.2 < 1) {
    return { color: 'rgb(var(--red-6))' };
  }
  if (Number(cpaBidScale) * 1.2 > 1) {
    return { color: 'rgb(var(--green-6))' };
  }
  return {};
};

/**
 * 委笔计算方法
 * @param conversionCost 转化
 * @param cpaBid 出价
 * @returns
 */
export const weibiCount = (
  conversionCost: string | number,
  cpaBid: string | number
) => {
  if (conversionCost === '--' || cpaBid === '--') return '-';
  return (Number(conversionCost) / Number(cpaBid)).toFixed(2);
};

export const weibiColor = (
  conversionCost: string | number,
  cpaBid: string | number
) => {
  if (conversionCost === '--' || cpaBid === '--') return {};
  if (Number(conversionCost) / Number(cpaBid) < 1) {
    return { color: 'rgb(var(--green-6))' };
  }
  return { color: 'rgb(var(--red-6))' };
};
