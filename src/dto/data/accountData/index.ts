export class AccountDataSearchFormDto {
  /**
   * 账户id
   */
  advertiser_id: string = '';
  /**
   * 投放产品
   */
  product_id: string = '';
  /**
   * 投放主体
   */
  company_id: string = '';
  /**
   * 媒体平台
   */
  // media_platform: string = '';
  /**
   * 人员
   */
  admin_id: string = '';
  /**
   * 短剧名称
   */
  // video_id: string = '';
  /**
   * 开始时间
   */
  // start_time: string = '';
  /**
   * 结束时间
   */
  // end_time: string = '';
  /**
   * 分时数据/日数据
   */
  hourType: string = 'hour';
}

export class AccountDataSearchTimeDto {
  /**
   * 开始时间
   */
  start_time: string = '';
  /**
   * 结束时间
   */
  end_time: string = '';
}

export class PlanDrawerSearchFormDto {
  /**
   * 计划名称
   */
  cdp_promotion_id: string = '';
  /**
   * 数据日期
   */
  stat_time_day: string = '';
}

export class SourceDrawerSearchFormDto {
  /**
   * 素材名称
   */
  material_id: string = '';
  /**
   * 数据日期
   */
  stat_time_day: string = '';
}

export class SetProductFormDto {
  /**
   * 人员
   */
  admin_id: string = '';
  /**
   * 投放产品
   */
  product_id: string = '';
  /**
   * 变现模式
   */
  ad_mode: string = '';
}