import axios from 'axios';
import Qs from 'qs';
import { AnyObject } from '@/types/global';

export interface ContentDataRecord {
  x: string;
  y: number;
}
interface SummaryMonthData {
  all_amount: string;
  cost: string;
  distribution_amount: string;
  roi: string;
  self_amount: string;
  xingtu_amount: string;
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}