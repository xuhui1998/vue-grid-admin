export default class PaginationDto {
  /**
   * 当前页
   */
  pageNo: number;

  /**
   * 每页条数
   */
  pageSize: number;

  /**
   * 排序字段
   */
  sortField?: string;

  /**
   * 排序方式
   */
  sortOrder?: string;

  /**
   * 总条数
   */
  total?: number;

  constructor() {
    this.pageNo = 1;
    this.pageSize = 10;
    this.sortField = '';
    this.sortOrder = '';
    this.total = 0;
  }

  reset?() {
    this.pageNo = 1;
    this.sortField = '';
    this.sortOrder = '';
  }
}
