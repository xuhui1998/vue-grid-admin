export default class ResponseDto<T> {
  /**
   * 状态码
   */
  code = 0;

  /**
   * token
   */
  token = '';

  /**
   * 信息
   */
  message = '';

  /**
   * 数据
   */
  data: T | null = null;
}
