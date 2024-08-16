import { TableColumnData } from "@arco-design/web-vue";

export interface AnyObject {
  [key: string]: unknown;
}

export interface Options {
  value: unknown;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  pageNo: number;
  pageSize?: number;
  total?: number | undefined;
  now_page?: number;
}

export class PaginationQuery {
  /**
   * 总条数
   */
  total = 0;

  /**
   * 当前页
   */
  pageNo = 1;

  /**
   * 每页条数
   */
  pageSize = 10;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

export interface LoginConfigProps {
  rememberPassword: boolean;
  username: string;
  password: string;
}

export type sizeProps = 'mini' | 'small' | 'medium' | 'large';

/** add or edit */
export type ModalType = 'add' | 'edit' | undefined;

export interface VideoArrItem {
  video_title: string;
  id: string;
}

export interface ServiceItem {
  id: string | undefined;
  service_name: string | undefined;
  service_type?: string | undefined;
}

export interface CpLogItem {
  id: string | undefined;
  pid: string | undefined;
  real_name: string | undefined;
}

export interface FieldProps {
  index: number;
  tooltip: string;
  labelWidth: number;
  maxLength: number;
  limit: number;
  checkStrictly: boolean;
  name: string;
  label: string;
  type: string;
  multiple: boolean;
  allowClear: 'allow' | 'notAllow';
  style: string;
  placeholder: string;
  search: string;
  elType: string;
  fieldNames: Options;
  options: Array<Options>;
  span?: number;
  disabled?: boolean;
  checkedValue?: string | number;
  uncheckedValue?: string | number;
  showTime: boolean;
  allowCreate: boolean;
  min: number;
  max: number;
  step: number;
  precision: number;
  mode: string;
  disabledAlpha?: boolean;
  showText?: boolean;
  appendText?: string;
}

export interface PromotionArr {
  cp_ad_id: string | undefined;
  ad_name: string | undefined;
}

export interface CpArrItem {
  id: string | undefined;
  merchant_id: string | undefined;
  merchant_name: string | null;
  real_name: string | undefined;
  pid: string | undefined;
}

export interface VideoItem {
  id: string;
  video_title: string;
}

export interface MerchantArr {
  id: string | undefined;
  merchant_name: string | undefined;
}

export interface MerchantGroupItem {
  id: string | undefined;
  group_name: string | undefined;
}

export interface ServerTypeItem {
  service_type: string | undefined;
  type_name: string | undefined;
}

export interface CommendListItem {
  id: string | undefined;
  key: number | undefined;
  commend_title: string | undefined;
  ctime: string | undefined;
}

export interface AdminInfo {
  id: string | undefined;
  admin_name: string | undefined;
}

export interface GridTableColumnData extends TableColumnData {
  show?: boolean;
  titleTip?: string;
}