export class JobTaskDto {
  /**
   * 任务名称
   */
  job_name: string = '';
  /**
   * sql语句
   */
  job_sql: string = '';
  /**
   * 排序
   */
  order: number = 1;
  /**
   * 状态
   */
  job_status: number = 0;
  /**
   * 请求参数
   */
  request_params: string = '';
}

export class JobLogSearchDto {
  /**
   * 任务数据库
   */
  schema_name: string = '';
  /**
   * 任务状态
   */
  status: string = '';
  /**
   * 创建开始时间
   */
  c_start_time: string = '';
  /**
   * 创建结束时间
   */
  c_end_time: string = '';
  /**
   * 更新开始时间
   */
  u_start_time: string = '';
  /**
   * 更新结束时间
   */
  u_end_time: string = '';
}