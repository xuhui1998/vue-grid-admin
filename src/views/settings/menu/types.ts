export interface MenuItems {
  path: string | undefined;
  name: string | undefined;
  label?: string | undefined;
  component: string | undefined;
  order: number | undefined;
  meta: {
    locale: string | undefined;
    requiresAuth: boolean | undefined;
    hideInMenu: boolean | undefined;
    ignoreCache: boolean | undefined;
    roles: string[] | undefined;
  };
  children?: MenuItems[];
}

export class MenuConfigProps {
  /**  是否一级菜单 1: 是 0: 否 */
  is_menu = '1';

  /**  菜单路径 */
  path = '';

  /** 菜单名称 */
  name = '';

  /** 页面地址 */
  component = '';

  /** 父级菜单ID */
  parent_id? = '0';

  /** 排序 */
  sort = 1 as number | null;

  /** 图标 */
  icon = '';

  /** 是否隐藏菜单 1: 显示 0: 隐藏 */
  status = '1';

  /** 是否缓存菜单 1: 是 0: 否 */
  is_cache = '0';
}
