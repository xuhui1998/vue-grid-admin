export default class PaginationResDto<T> {
  /**
   * 当前页
   */
  now_page: number;

  /**
   * 每页条数
   */
  pageSize: number;

  /**
   * 总条数
   */
  total: number;

  /**
   * 总页数
   */
  total_page: number;

  /**
   * 数据列表
   */
  list: Array<T>;

  constructor() {
    this.now_page = 1;
    this.pageSize = 10;
    this.total = 0;
    this.total_page = 0;
    this.list = [];
  }
}
