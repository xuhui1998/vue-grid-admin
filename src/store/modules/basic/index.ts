/*
 * @Author: mizao 1253767373@qq.com
 * @Date: 2024-08-15 15:58:40
 * @LastEditors: mizao 1253767373@qq.com
 * @LastEditTime: 2025-03-25 15:41:01
 * @FilePath: /vue-grid-admin/src/store/modules/basic/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';
import { BasicStoreProps } from './types';

const useBasicStore = defineStore({
  id: 'basic',
  state: (): BasicStoreProps => ({}),
  // 配置数据持久化 pinia
  persist: {
    paths: [],
  },
  actions: {},
});

export default useBasicStore;
