export class AdminFormDto {
  /**
   * id
   */
  id?: string = '';
  /**
   * 人员状态
   */
  status: number = 1;
  /**
   * 是否超级管理员
   */
  is_super: number = 0;
  /**
   * 账号
   */
  account: string = '';
  /**
   * 密码
   */
  password: string = '';
  /**
   * 确认密码
   */
  comfirmpwd: string = '';
  /**
   * 用户名
   */
  real_name: string = '';
  /**
   * 菜单/操作权限
   */
  role_id?: string[] | string = [];
}