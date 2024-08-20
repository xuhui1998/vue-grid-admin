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
  /**  菜单ID */
  id?: string = '';

  /**  菜单路径 */
  path: string = '';

  /** 菜单名称 */
  locale: string = '';

  /** 路由名称 */
  name: string = '';

  /** 页面地址 */
  component: string = '';

  /** 父级菜单ID 0: 一级菜单 */
  pid?: number = 0;

  /** 排序 */
  order = 1 as number | null;

  /** 图标 */
  icon: string = '';

  /** 是否隐藏菜单 1: 显示 0: 隐藏 */
  hideInMenu: boolean = false;

  /** 是否缓存菜单 1: 是 0: 否 */
  ignoreCache: boolean = false;
}
