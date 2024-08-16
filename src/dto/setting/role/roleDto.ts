import BaseDto from '@/dto/baseDto';

export default class RoleDto extends BaseDto {
  /**
   * 角色名称
   */
  role_name: string = '';

  /**
   * 父角色
   */
  parent_id?: string = '';

  /**
   * 角色描述
   */
  desc?: string = '';

  /**
   * 分配权限
   */
  menu_ids: string[] = [];

  /**
   * 状态
   */
  status: string = '1';
}
